async function initializeLogin() {
    var email = document.getElementById('emailLogin').value
    var senha = document.getElementById('senhaLogin').value
    try {
        const response = await fetch('./engine/users.json')
        const users = await response.json()
        const userValided = users.find(u =>
            u.email === email
            &&
            u.senha === senha)

        if (userValided) {
            localStorage.setItem("usuarioAtual", JSON.stringify(userValided))
            setTimeout(() => {
                window.location.href = './dashboard.html'
            }, 5000)
        } else {
            alert('Erro ao processar, Dados não podem ser conferidos, neste estabelecimento.')
        }
    } catch (e) {
        console.error(error)
    }
}

async function storageUsersInfo() {
    const userLoged = JSON.parse(localStorage.getItem('usuarioAtual'))
    console.log(userLoged.extrato)

    if (userLoged.photoUrl != "") {
        document.getElementById("login-img").innerHTML = `<img src="${userLoged.photoUrl}" class="img-fluid rounded-start" alt="${userLoged.email}" width="100%">`
    } else {
        document.getElementById("login-img").innerHTML = `<img src="./assets/logo_claro.png" class="img-fluid rounded-start" alt="..." width="100%">`
    }
    let coin = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
    </svg>
    `
    let money = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
    </svg>
    `
    let extrato = `<ol class="list-group list-group-numbered">`
    document.getElementById("login-name").innerText = userLoged.name
    document.getElementById("login-email").innerText = userLoged.email
    document.getElementById("login-date").innerText = new Date().toLocaleDateString('pt-BR')
    for (let i = 0; i < userLoged.extrato.length; i++) {
    extrato += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${userLoged.extrato[i].valor < 0 ? money : coin} |${userLoged.extrato[i].descricao}</div>
            [${userLoged.extrato[i].data}]
            </div>
            <span class="badge text-bg-primary rounded-pill">${userLoged.extrato[i].valor}</span>
        </li>`
    }
    extrato += `</ol>`
    
    let pontos = `
    <div class="badge text-bg-success text-wrap" style="width: 10rem;" style="margin-right: 10px;">
    Pontos: ${userLoged.pontos}
    </div>
    `
    let saldo = `
    <div class="badge text-bg-info text-wrap" style="width: 10rem;" style="margin-right: 10px;">
    Saldo: ${userLoged.saldo}
    </div>
    `
    
    document.getElementById("login-extrato").innerHTML = extrato
    document.getElementById("login-menu").innerHTML = extrato
    document.getElementById("conta").innerHTML = pontos + saldo
}