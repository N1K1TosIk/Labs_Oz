let currentFormType = 'exponential';

function applyFormType() 
{
    let radios = document.getElementsByName('formType');
    let selectedType = 'exponential';
    
    for (let i = 0; i < radios.length; i++)
    {
        if (radios[i].checked) 
        {
            selectedType = radios[i].value;
            break;
        }
    }
    
    currentFormType = selectedType;
    
    let labelR = document.getElementById('labelR');
    let labelPhi = document.getElementById('labelPhi');
    
    if (selectedType === 'exponential') 
    {
        labelR.textContent = 'Модуль (r):';
        labelPhi.textContent = 'Аргумент φ (в градусах):';
    } 
    else 
    {
        labelR.textContent = 'Модуль (r):';
        labelPhi.textContent = 'Аргумент φ (в градусах):';
    }
    
    document.getElementsByName('r')[0].focus();
}

function calculate(form) 
{
    let rStr = form.r.value.replace(',', '.');
    let phiStr = form.phi.value.replace(',', '.');
    let r = parseFloat(rStr);
    let phi = parseFloat(phiStr);
    
    let calcOptions = document.getElementById('calcOptions');
    let selectedOptions = [];
    for (let i = 0; i < calcOptions.options.length; i++)
    {
        if (calcOptions.options[i].selected) 
        {
            selectedOptions.push(calcOptions.options[i].value);
        }
    }
    
    let hasError = false;
    
    if (isNaN(r) || r < 0) 
    {
        showError('r', 'Введите неотрицательное число для модуля');
        hasError = true;
    }
    
    if (isNaN(phi)) 
    {
        showError('phi', 'Введите число для аргумента');
        hasError = true;
    }
    
    if (selectedOptions.length === 0) 
    {
        document.getElementById('errorOptions').textContent = 'Выберите хотя бы одну операцию';
        document.getElementById('calcOptionsLabel').classList.add('error');
        calcOptions.classList.add('error');
        hasError = true;
    }
    
    if (hasError) return false;
    
    let phiRad = phi * Math.PI / 180;
    let realPart = r * Math.cos(phiRad);
    let imaginaryPart = r * Math.sin(phiRad);
    
    let output = document.getElementById('output');
    output.innerHTML = '';
    
    if (selectedOptions.includes('otherForm')) 
    {
        let otherFormElement = document.createElement('div');
        otherFormElement.className = 'result-item';
        let otherFormType = currentFormType === 'exponential' ? 'тригонометрической' : 'показательной';
        let otherFormText = '';
        
        if (currentFormType === 'exponential') 
        {
            otherFormText = 'z = ' + r.toFixed(3) + ' * (cos(' + phi.toFixed(3) + '°) + i*sin(' + phi.toFixed(3) + '°))';
        } 
        else 
        {
            otherFormText = 'z = ' + r.toFixed(3) + ' * e^(i*' + phi.toFixed(3) + '°)';
        }
        
        otherFormElement.innerHTML = '<strong>Представление в ' + otherFormType + ' форме:</strong><br>' + otherFormText;
        output.appendChild(otherFormElement);
    }
    
    if (selectedOptions.includes('realPart')) 
    {
        let realPartElement = document.createElement('div');
        realPartElement.className = 'result-item';
        realPartElement.innerHTML = '<strong>Действительная часть: ' + realPart.toFixed(3) + '</strong>';
        output.appendChild(realPartElement);
    }
    
    if (selectedOptions.includes('imaginaryPart')) 
    {
        let imaginaryPartElement = document.createElement('div');
        imaginaryPartElement.className = 'result-item';
        imaginaryPartElement.innerHTML = '<strong>Мнимая часть: ' + imaginaryPart.toFixed(3) + '</strong>';
        output.appendChild(imaginaryPartElement);
    }
    
    if (selectedOptions.includes('argument')) 
    {
        let argumentElement = document.createElement('div');
        argumentElement.className = 'result-item';
        let normalizedPhi = phi;
        while (normalizedPhi < 0) normalizedPhi += 360;
        while (normalizedPhi >= 360) normalizedPhi -= 360;
        argumentElement.innerHTML = '<strong>Аргумент числа: ' + normalizedPhi.toFixed(3) + '°</strong>';
        output.appendChild(argumentElement);
    }
}

function showError(fieldName, message) 
{
    let field = document.getElementsByName(fieldName)[0];
    let errorElement = document.getElementById('error' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
    
    if (field) 
    {
        field.classList.add('error');
    }
    
    if (errorElement) 
    {
        errorElement.textContent = message;
    }
}

function clearError(field) 
{
    field.classList.remove('error');
    
    let fieldName = field.name;
    if (fieldName) 
    {
        let errorElement = document.getElementById('error' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
        if (errorElement) 
        {
            errorElement.textContent = '';
        }
    }
    
    document.getElementById('output').innerHTML = '';
    
    if (field.id === 'calcOptions' || field.name === 'calcOptions') 
    {
        document.getElementById('calcOptionsLabel').classList.remove('error');
        document.getElementById('errorOptions').textContent = '';
    }
}

function clearForm(form) 
{
    form.r.value = '';
    form.phi.value = '';
    
    let calcOptions = document.getElementById('calcOptions');
    for (let i = 0; i < calcOptions.options.length; i++)
    {
        calcOptions.options[i].selected = false;
    }
    
    let errorMessages = document.querySelectorAll('.error-message');
    for (let i = 0; i < errorMessages.length; i++)
    {
        errorMessages[i].textContent = '';
    }
    
    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++)
    {
        errorElements[i].classList.remove('error');
    }
    
    document.getElementById('calcOptionsLabel').classList.remove('error');
    document.getElementById('output').innerHTML = '';
    
    return false;
}

window.onload = function() 
{
    applyFormType();
    
    // Привязка обработчиков событий
    let applyFormTypeBtn = document.getElementById('applyFormTypeBtn');
    if (applyFormTypeBtn) 
    {
        applyFormTypeBtn.addEventListener('click', applyFormType);
    }
    
    let calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) 
    {
        calculateBtn.addEventListener('click', function() 
        {
            let form = document.forms['calcForm'];
            if (form) 
            {
                calculate(form);
            }
        });
    }
    
    let clearBtn = document.getElementById('clearBtn');
    if (clearBtn) 
    {
        clearBtn.addEventListener('click', function() 
        {
            let form = document.forms['calcForm'];
            if (form) 
            {
                clearForm(form);
            }
        });
    }
    
    let rInput = document.getElementsByName('r')[0];
    if (rInput) 
    {
        rInput.addEventListener('focus', function() 
        {
            clearError(this);
        });
    }
    
    let phiInput = document.getElementsByName('phi')[0];
    if (phiInput) 
    {
        phiInput.addEventListener('focus', function() 
        {
            clearError(this);
        });
    }
    
    let calcOptions = document.getElementById('calcOptions');
    if (calcOptions) 
    {
        calcOptions.addEventListener('focus', function() 
        {
            clearError(this);
        });
    }
};
