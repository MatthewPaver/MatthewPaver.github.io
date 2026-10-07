#!/usr/bin/env python3
"""Serve pages-dist for the Playwright suite.

`python3 -m http.server` listens with a backlog of 5. On macOS the kernel resets
connections beyond that, so pages that fetch many assets at once fail locally
while passing on Linux CI.
"""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1] / "pages-dist"


class PagesServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


class QuietHandler(SimpleHTTPRequestHandler):
    """Static handler with single-range support, as GitHub Pages has.

    Chromium streams <video> with Range requests; without 206 responses the
    screening-room walkthrough intermittently never starts playing.
    """

    def send_head(self):
        self._range = None
        header = self.headers.get("Range", "")
        path = Path(self.translate_path(self.path))
        if not header.startswith("bytes=") or not path.is_file():
            return super().send_head()
        size = path.stat().st_size
        start_text, _, end_text = header[6:].split(",")[0].partition("-")
        try:
            if start_text:
                start, end = int(start_text), int(end_text) if end_text else size - 1
            else:
                start, end = max(size - int(end_text), 0), size - 1
        except ValueError:
            return super().send_head()
        if start >= size or start > end:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None
        end = min(end, size - 1)
        handle = path.open("rb")
        handle.seek(start)
        self._range = end - start + 1
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(str(path)))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(self._range))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        return handle

    def copyfile(self, source, outputfile):
        if self._range is None:
            return super().copyfile(source, outputfile)
        remaining = self._range
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)

    def log_message(self, format, *args):  # noqa: A002
        return


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
    server = PagesServer(("127.0.0.1", port), partial(QuietHandler, directory=ROOT))
    server.serve_forever()


if __name__ == "__main__":
    main()
