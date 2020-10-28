function showLoading() {
    loader.classList.add('show');

    setTimeout(() => {
        loader.classList.remove('show');
    }, 2000)
}

export { showLoading } ;