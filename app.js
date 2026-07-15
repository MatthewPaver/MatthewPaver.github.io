const buttons = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('[data-kind]')];

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    products.forEach((product) => {
      const matches = filter === 'all' || product.dataset.kind.split(' ').includes(filter);
      product.classList.toggle('hidden', !matches);
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
