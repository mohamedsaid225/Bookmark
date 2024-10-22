var siteNameInput = document.getElementById('bookMarkName')
var siteURLInput = document.getElementById('bookMarkURL')
var boxModal = document.getElementById('modal')
var body = document.getElementsByTagName('body')

var dataContainer = []
if (localStorage.getItem('data') !== null) {
  dataContainer = JSON.parse(localStorage.getItem('data'))
  display()
}

function Submit() {

  if (siteNameInput.classList.contains("is-valid") && siteURLInput.classList.contains("is-valid")) {
    var data = {
      siteName: siteNameInput.value,
      siteURL: siteURLInput.value,

    }

    dataContainer.push(data)
    localStorage.setItem('data', JSON.stringify(dataContainer))
    clearForm()
    display()
    siteNameInput.classList.remove("is-valid");
    siteURLInput.classList.remove("is-valid");
  }
  else {
    Swal.fire({
      html: `<div class="circles pt-3 pb-4 d-flex">
          <span class="rounded-circle me-2" style="background-color: #f15f5d;"></span>
          <span class="rounded-circle me-2" style="background-color: #febe2e;"></span>
          <span class="rounded-circle me-2" style="background-color: #4db748;"></span>
        </div>
        <div class='text-start' style=' font-family: "Bree Serif", serif ; font-size: 21px ; line-height: 1.3 ;
         color: #352e28 ;'> 
         <p class="m-0 pb-2"> Site Name or Url is not valid, Please follow the rules below :
          </p>
         </div>
     
      <ol class="list-unstyled m-0 rules">
        <li class='text-start' style='color: #352e28'>
          <i class="fa-regular fa-circle-right p-2" style="color: #bb4120;"></i>
          Site name must contain at least 3 characters
        </li>
        <li class='text-start' style='color: #352e28'>
          <i class="fa-regular fa-circle-right p-2" style="color: #bb4120;"></i>
          Site URL must be a valid one
        </li>

      </ol>`,
      showCloseButton: true,
      showConfirmButton: false,

    });
  }

}

function clearForm() {
  siteNameInput.value = null;
  siteURLInput.value = null;
}
function display() {
  var cartona = ''
  for (var i = 0; i < dataContainer.length; i++) {
    cartona +=
      `<tr>
                      <td>${i + 1}</td>
                      <td>${dataContainer[i].siteName}</td>
                      <td><button class='btn btn-visit' onclick='visit(${i})'  data-index='${i}'><a href=""><i class='fa-solid fa-eye pe-2' style="color: white;"> </i> visit</a></button></td>
                      <td><button class='btn btn-delete' data-index='${i}' onclick='Delete(${i})'><i class='fa-solid fa-trash-can ' style="color: white;"> </i> delete</button></td>
             </tr>
        `
  }
  document.getElementById('t-content').innerHTML = cartona
  }

function Delete(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      dataContainer.splice(index, 1)
      localStorage.setItem('data', JSON.stringify(dataContainer))
      display()
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });

}

function validateForm(ele) {
  var regex = {
    bookMarkName: /^[a-z0-9_-]{3,15}$/,
    bookMarkURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  }
  if (regex[ele.id].test(ele.value)) {
    ele.classList.remove('is-invalid')
    ele.classList.add('is-valid')
  }
  else {
    ele.classList.remove('is-valid')
    ele.classList.add('is-invalid')
  }
}
function visit(i) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(dataContainer[i].siteURL)) {
    open(dataContainer[i].siteURL);
  } else {
    open(`https://${dataContainer[i].siteURL}`);
  }

}
