function buscarCEP() {
  const cepInput = document.getElementById("cep");
  const resultado = document.getElementById("resultado");
  const cep = cepInput.value.trim();

  resultado.innerHTML = "";

  if (!/^[0-9]{8}$/.test(cep)) {
    resultado.innerHTML = '<p style="color: red;">CEP inválido! Digite exatamente 8 números.</p>';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://viacep.com.br/ws/${cep}/json`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      if (data.erro) {
        resultado.innerHTML = '<p style="color: red;">CEP não encontrado.</p>';
      } else {
        resultado.innerHTML = `
          <p><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado (UF):</strong> ${data.uf}</p>
        `;
      }
    } else {
      resultado.innerHTML = '<p style="color: red;">Erro na requisição. Tente novamente.</p>';
    }
  };

  xhr.onerror = function () {
    resultado.innerHTML = '<p style="color: red;">Erro de conexão. Verifique sua internet.</p>';
  };

  xhr.send();
}
