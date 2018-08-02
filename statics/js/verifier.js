const checkField = () => {
    
    document.getElementById('button').disabled = !(document.forms['form']['email'].value.match(/([a-zA-Z]+|[0-9]+)(@)(\w+)(.com|.co.uk|.net)/))
    
    
};

window.onload = setInterval(checkField, 500);