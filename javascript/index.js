
// CREATED
$('#addForm').submit(function (event) {
    event.preventDefault();

    let noRegistrasi = $('#noRegistrasi').val();
    let namaPemilik = $('#namaPemilik').val();
    let merkKendaraan = $('#merkKendaraan').val();
    let alamat = $('#validationAlamat').val();
    let tahunPembuatan = $('#tahunPembuatan').val();
    let kapasitasSilinder = $('#kapasitasSilinder').val();
    let warnaKendaraan = $('#warnaKendaraan').val();
    let bahanBakar = $('#bahanBakar').val();

    let newData = {
        noReg: noRegistrasi,
        nameUser: namaPemilik,
        vclBrand: merkKendaraan,
        yearsOM: tahunPembuatan,
        capacity: kapasitasSilinder,
        color: warnaKendaraan,
        fuel: bahanBakar,
        address: alamat
    };

    // POST ke API 
    $.ajax({
        url: "http://localhost:8080/api/employs",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newData),
        success: function () {

            showAlert("berhasil menambahakan data ", "success");

            $("#addForm")[0].reset();
        },
        error: function (error) {
            console.error("Gagal memperbarui data:", error);

            showAlert("Gagal memperbarui data. Silakan coba lagi.", "danger");
        }
    });
});

// UPDATE
$("#myForm").submit(function (event) {
    event.preventDefault();

    let id = $('#id').val();
    let noRegistrasi = $('#noRegistrasi').val();
    let namaPemilik = $('#namaPemilik').val();
    let merkKendaraan = $('#merkKendaraan').val();
    let alamat = $('#validationAlamat').val();
    let tahunPembuatan = $('#tahunPembuatan').val();
    let kapasitasSilinder = $('#kapasitasSilinder').val();
    let warnaKendaraan = $('#warnaKendaraan').val();
    let bahanBakar = $('#bahanBakar').val();

    let formData = {
        id,
        noReg: noRegistrasi,
        nameUser: namaPemilik,
        vclBrand: merkKendaraan,
        yearsOM: tahunPembuatan,
        capacity: kapasitasSilinder,
        color: warnaKendaraan,
        fuel: bahanBakar,
        address: alamat
    };

    // PUT By Id
    $.ajax({
        url: `http://localhost:8080/api/employs/${formData.id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (updatedData) {

            console.log("Data berhasil diperbarui:", updatedData);


            showAlert("Data berhasil diperbarui ", "success");

            $("#myForm")[0].reset();
        },
        error: function (error) {

            console.error("Gagal memperbarui data:", error);

            showAlert("Gagal memperbarui data. Silakan coba lagi.", "danger");
        }
    });
});

// FILTER
$("#form-src").submit(function (event) {
    event.preventDefault();

    let noRegistrasi = $('#noRegistrasi').val();
    let namaPemilik = $('#namaPemilik').val();

    let formData = {
        noReg: noRegistrasi,
        nameUser: namaPemilik
    };

    // Filtering
    $.ajax({
        url: 'http://localhost:8080/api/employs/search',
        method: 'GET',
        data: {
            noReg: formData.noReg,
            nameUser: formData.nameUser
        },
        success: function (result) {
            console.log(result);
            updateTable(result);
        },
        error: function (error) {
            console.error('Kesalahan Pencarian:', error);
        }
    });
});

// GET DATA ALL
function GetAll() {
    let apiUrl = "http://localhost:8080/api/employs";

    let tbody = $(".table-group-divider");

    $.get(apiUrl, function (data) {
        console.log(data);

        $.each(data, function (index, item) {
            let row = $("<tr>");

            row.append($("<th>").attr("scope", "row").text(index + 1));
            row.append($("<td>").text(item.noReg));
            row.append($("<td>").text(item.nameUser));
            row.append($("<td>").text(item.vclBrand));
            row.append($("<td>").text(item.yearsOM));
            row.append($("<td>").text(item.capacity));
            row.append($("<td>").text(item.color));
            row.append($("<td>").text(item.fuel));

            let actionColumn = $("<td>").addClass("action");

            let detailButton = $("<span>").addClass("text-warning act-icon").text("Detail ");
            detailButton.append('<i class="bi bi-ticket-detailed-fill"></i>');

            let editButton = $("<span>").addClass("text-primary act-icon").text("Edit ");
            editButton.append('<i class="bi bi-pencil-square"></i>');

            editButton.click(function () {
                let id = item.id;

                window.location.href = `/html/Update.html?id=${id}`;

            });

            let deleteButton = $("<span>").addClass("text-danger act-icon").text("Delete ");
            deleteButton.append('<i class="bi bi-trash"></i>');
            // DELETE BY Id
            deleteButton.click(function () {
                let id = item.id;
                let noReg = item.noReg;
                let isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus data ${noReg}?`);
                if (isConfirmed) {

                    $.ajax({
                        url: "http://localhost:8080/api/employs/" + id,
                        type: "DELETE",
                        success: function () {
                            showAlert("Berhasil Menghapus Table ", "success");
                            row.remove();
                        },
                        error: function (xhr, status, error) {
                            console.error("Error deleting item:", error);
                            showAlert("Gagal Menghapus Table", "danger");
                        }
                    });
                }
            })
            actionColumn.append(detailButton).append(editButton).append(deleteButton);

            row.append(actionColumn);

            tbody.append(row);
        });
    })
}

// Fungsi Filtered
function updateTable(data) {

    let dataTable = $('#dataTable');

    // Clean isi tabel
    dataTable.empty();

    let tableHeader = '<thead><tr class="table-active table-success"><th scope = "col" > No</th><th scope="col">No Registrasi</th><th scope="col">Nama Pemilik</th><th scope="col">Merk Kendaraan</th><th scope="col">Tahun Pembuatan</th><th scope="col">Kapasitas</th><th scope="col">Warna</th><th scope="col">Bahan Bakar</th><th scope="col">Action</th></tr ></thead > ';
    dataTable.append(tableHeader);

    let tableBody = $('<tbody>').addClass('table-group-divider');


    $.each(data, function (index, item) {

        let row = $('<tr>');

        row.append($("<th>").attr("scope", "row").text(index + 1));
        row.append($("<td>").text(item.noReg));
        row.append($("<td>").text(item.nameUser));
        row.append($("<td>").text(item.vclBrand));
        row.append($("<td>").text(item.yearsOM));
        row.append($("<td>").text(item.capacity));
        row.append($("<td>").text(item.color));
        row.append($("<td>").text(item.fuel));

        let actionColumn = $("<td>").addClass("action");

        let detailButton = $("<span>").addClass("text-warning act-icon").text("Detail ");
        detailButton.append('<i class="bi bi-ticket-detailed-fill"></i>');

        let editButton = $("<span>").addClass("text-primary act-icon").text("Edit ");
        editButton.append('<i class="bi bi-pencil-square"></i>');

        editButton.click(function () {
            let id = item.id;

            window.location.href = `/html/Update.html?id=${id}`;

        });

        let deleteButton = $("<span>").addClass("text-danger act-icon").text("Delete ");
        deleteButton.append('<i class="bi bi-trash"></i>');
        // DELETE BY Id
        deleteButton.click(function () {
            let id = item.id;
            let noReg = item.noReg;
            let isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus data ${noReg}?`);
            if (isConfirmed) {

                $.ajax({
                    url: "http://localhost:8080/api/employs/" + id,
                    type: "DELETE",
                    success: function () {
                        showAlert("Berhasil Menghapus Table ", "success");
                        row.remove();
                    },
                    error: function (xhr, status, error) {
                        console.error("Error deleting item:", error);
                        showAlert("Gagal Menghapus Table", "danger");
                    }
                });
            }
        })
        actionColumn.append(detailButton).append(editButton).append(deleteButton);

        row.append(actionColumn);
        tableBody.append(row);
    });

    dataTable.append(tableBody);
}


// Fungsi untuk menampilkan pesan alert
function showAlert(message, type) {
    $(".alert").remove();

    let alert = $('<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert"><strong>' + message + '!</strong> a vehicle. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');

    $('.alert-add').append(alert);

    setTimeout(function () {
        alert.fadeOut("slow", function () {
            $(this).remove();
        });
    }, 3000);
}

$(document).ready(function () {
    GetAll();
    let id = new URLSearchParams(window.location.search).get('id');

    if (id) {
        $.get(`http://localhost:8080/api/employs/${id}`, function (employeeData) {

            $('#id').val(employeeData.id);
            $('#noRegistrasi').val(employeeData.noReg);
            $('#namaPemilik').val(employeeData.nameUser);
            $('#merkKendaraan').val(employeeData.vclBrand);
            $('#tahunPembuatan').val(employeeData.yearsOM);
            $('#kapasitasSilinder').val(employeeData.capacity);
            $('#warnaKendaraan').val(employeeData.color);
            $('#bahanBakar').val(employeeData.fuel);
            $('#validationAlamat').val(employeeData.address);
        });
    }
});