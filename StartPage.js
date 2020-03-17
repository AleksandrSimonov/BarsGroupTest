require('bootstrap');
function InsertOrUpdateInstitution() {

    if (Validate()) {



        var adress = document.getElementById("Adress").value;
        var name = document.getElementById("Name").value;
        var phone = document.getElementById("Phone").value;

        var medicalInstitution = JSON.parse(localStorage.getItem("medicalInstitution"));
        var institutionId = document.getElementById("InstitutionId").value;

        if (institutionId != -1) {
            UpdateInstitution(institutionId, adress, name, phone, medicalInstitution);
        }
        else {
            InsertInstitution(adress, name, phone, medicalInstitution);
        }

        $('#exampleModalCenter').modal('hide');
        SearchInstitution();
    }
}

function InsertInstitution(adress, name, phone, medicalInstitution) {


    var id = 0;

    if (medicalInstitution.length == undefined) {
        medicalInstitution = [];
    }
    else {
        if (medicalInstitution.length != 0) {
            id = medicalInstitution[medicalInstitution.length - 1].Id + 1;
        }
    }
    var newMedicalInstitution =
    {
        "Id": id,
        "full_name": name,
        "adress": adress,
        "phone": phone
    };
    medicalInstitution.push(newMedicalInstitution);
    localStorage.setItem('medicalInstitution', JSON.stringify(medicalInstitution));
}
function UpdateInstitution(institutionId, adress, name, phone, medicalInstitution) {

    medicalInstitution.forEach(function (item, index) {
        if (item.Id == institutionId) {
            item.full_name = name;
            item.adress = adress;
            item.phone = phone;
        }
    });
    localStorage.setItem('medicalInstitution', JSON.stringify(medicalInstitution));
}
function Validate() {

    var isValideName = ValidateName(document.getElementById('Name'));
    var isValideAdress = ValidateAdress(document.getElementById('Adress'));
    var isValidePhone = ValidatePhone(document.getElementById('Phone'));

    return isValideName && isValideAdress && isValidePhone;
}
function ValidateName(Name) {

    var strName = String(Name.value);
    strName = strName.charAt(0).toUpperCase() + strName.slice(1);
    Name.value = strName;

    if ((strName.length < 3) || (strName.length === 0)) {
        Name.classList.add('is-invalid');
        Name.classList.remove('is-valid');
        return false;
    }
    if (3 <= strName.length) {
        Name.classList.remove('is-invalid');
        Name.classList.add('is-valid');
        return true;
    }
}
function ValidateAdress(Adress) {

    var strAdress = String(Adress.value);
    strAdress = strAdress.charAt(0).toUpperCase() + strAdress.slice(1);
    Adress.value = strAdress;

    if ((strAdress.length < 3) || (strAdress.length === 0)) {
        Adress.classList.add('is-invalid');
        Adress.classList.remove('is-valid');
        return false;
    }
    if (3 <= strAdress.length) {
        Adress.classList.remove('is-invalid');
        Adress.classList.add('is-valid');
        return true;
    }
}
function ValidatePhone(PhoneNumber) {

    var strPhoneNumber = String(PhoneNumber.value);

    var reg = /\+7 \(\d\d\d\) \d\d\d \d\d-\d\d/;

    if (reg.test(strPhoneNumber)) {
        PhoneNumber.classList.remove('is-invalid');
        PhoneNumber.classList.add('is-valid');
        return true;
    }
    else {
        PhoneNumber.classList.add('is-invalid');
        PhoneNumber.classList.remove('is-valid');
        return false;
    }
}
function AddDefaultData() {
    if (localStorage.getItem("medicalInstitution") == null) {
        var medicalInstitution = [
            {
                "Id": 1,
                "full_name": "Больница 1",
                "adress": "Казань, ул. 1, д.1",
                "phone": "123 45 67"
            }
        ]
        localStorage.setItem('medicalInstitution', JSON.stringify(medicalInstitution));
    }
    SearchInstitution();
}
function SearchInstitution() {
    $('#InstitutionsTable tbody').remove();
    var medicalInstitution = JSON.parse(localStorage.getItem("medicalInstitution"));
    medicalInstitution.forEach(function (value, index, medicalInstitution) {
        $('#InstitutionsTable').append('<tr id= "' + value.Id + '" data-toggle="popover" data-content="удалить учереждение">' +
            '<th scope="row">' + index + '</th>' +
            '<td>' + value.full_name + '</td>' +
            '<td>' + value.adress + '</td>' +
            '<td>' + value.phone + '</td>' +
            '<td> <button id= "' + value.Id + '" type="button" class="btn btn-outline-primary" onclick="UpdateInstitutionForm(this)">редактировать учереждение</button> </td>' +
            '<td> <button onclick="DeleteInstitutionForm(this)" id= "' + value.Id + '" type="button" class="btn btn-outline-danger">удалить учереждение</button> </td>' +
            '</tr>');
    });

}
function AddNewInstitutionForm() {
    $('#InstitutionForm input').each(function (i, obj) {
        obj.value = "";
        obj.classList.remove('is-valid');
        obj.classList.remove('is-invalid');
    });


    $('#InstitutionId').val("-1");

    $('#InstitutionFormTitle')[0].innerText = "Добавьте новое учереждение";
    $('#exampleModalCenter').modal();
}
function UpdateInstitutionForm(options) {
    $('#exampleModalCenter').modal();

    $('#InstitutionForm input').each(function (i, obj) {
        obj.classList.remove('is-valid');
        obj.classList.remove('is-invalid');
    });

    $('#InstitutionFormTitle')[0].innerText = "Введите изменения в учереждение";
    $('#InstitutionId').val(options.id);
    $('#Name').val($('#' + options.id + ' td')[0].innerHTML);
    $('#Adress').val($('#' + options.id + ' td')[1].innerHTML);
    $('#Phone').val($('#' + options.id + ' td')[2].innerHTML);
}
function DeleteInstitutionForm(institution) {
    $('#InstitutionId').val(institution.id);
    $('#DeleteСonfirm').modal('show');
}
function DeleteInstitution(institution) {
    var medicalInstitution = JSON.parse(localStorage.getItem("medicalInstitution"));
    medicalInstitution.forEach(function (value, index, medicalInstitution) {
        if (value.Id == institution.value) {
            medicalInstitution.splice(index, 1);
        }
    });
    localStorage.setItem('medicalInstitution', JSON.stringify(medicalInstitution));
    SearchInstitution();
}

