const formData = new FormData();
formData.append('WSQ', 'aeaee');
formData.append('chave', 1);

fetch('http://simuladorautosmartsim.com.br/homologacao/webservice_1.5/valid/valida.php', {
  method: 'POST',
  body: formData
})
.then(r => r.json())
.then(data => {
  console.log(data)
})
