let isAdmin = false;
const listGroups = document.getElementById("list-group");
const userId = document.getElementById("loggedUserId").value;
let url = '/api/users/' + userId;
fetch(url)
    .then(response => response.json())
    .then(result => {
        const aUser = document.createElement('a');
        aUser.id = "user-button";
        aUser.classList.add("list-group-item");
        aUser.classList.add("list-group-item-action");
        aUser.innerText = "User";
        aUser.setAttribute("onclick", "userClick();");
        listGroups.append(aUser);
        for (const role of result.authorities) {
            if (role.role == 'ROLE_ADMIN') {
                isAdmin = true;
                const aAdmin = document.createElement('a');
                aAdmin.id = "admin-button";
                aAdmin.classList.add("list-group-item");
                aAdmin.classList.add("list-group-item-action");
                aAdmin.classList.add("active");
                aAdmin.innerText = "Admin";
                aAdmin.setAttribute("onclick", "adminClick();");
                listGroups.prepend(aAdmin);
                adminClick();
            } else {
                userClick();
                aUser.classList.add("active");
            }
        }
    });

function userClick() {
    const mainContent = document.getElementById("main-content");
    if (isAdmin) {
        const userButton = document.getElementById("user-button");
        userButton.classList.add("active");
        const adminButton = document.getElementById("admin-button");
        adminButton.classList.remove("active");
    }
    mainContent.replaceChildren();
    fetch(url)
        .then(response => response.json())
        .then(result => {
            const h2 = document.createElement('h2');
            h2.classList.add("text-start");
            h2.classList.add("ps-3");
            h2.innerText = "User information-page";
            mainContent.append(h2);
            const div1 = document.createElement('div');
            div1.classList.add("card");
            const div2 = document.createElement('div');
            div2.classList.add("card-header");
            const h6 = document.createElement('h6');
            h6.classList.add("text-start");
            h6.classList.add("ps-3");
            h6.innerText = "About user";
            div2.append(h6);
            const div3 = document.createElement('div');
            div3.classList.add("card-body");
            const table = document.createElement('table');
            table.classList.add("table");
            table.classList.add("table-striped");
            const thead = document.createElement('thead');
            const trHead = document.createElement('tr');
            const thHeadId = document.createElement('th');
            thHeadId.scope = "col";
            thHeadId.innerText = "ID";
            const thHeadFirstName = document.createElement('th');
            thHeadFirstName.scope = "col";
            thHeadFirstName.innerText = "First Name";
            const thHeadLastName = document.createElement('th');
            thHeadLastName.scope = "col";
            thHeadLastName.innerText = "Last Name";
            const thHeadAge = document.createElement('th');
            thHeadAge.scope = "col";
            thHeadAge.innerText = "Age";
            const thHeadEmail = document.createElement('th');
            thHeadEmail.scope = "col";
            thHeadEmail.innerText = "Email";
            const thHeadRole = document.createElement('th');
            thHeadRole.scope = "col";
            thHeadRole.innerText = "Role";
            trHead.append(thHeadId);
            trHead.append(thHeadFirstName);
            trHead.append(thHeadLastName);
            trHead.append(thHeadAge);
            trHead.append(thHeadEmail);
            trHead.append(thHeadRole);
            thead.append(trHead);
            const tbody = document.createElement('tbody');
            const trBody = document.createElement('tr');
            const tdBodyId = document.createElement('td');
            tdBodyId.innerText = result.id;
            const tdBodyFirstName = document.createElement('td');
            tdBodyFirstName.innerText = result.firstname;
            const tdBodyLastName = document.createElement('td');
            tdBodyLastName.innerText = result.lastname;
            const tdBodyAge = document.createElement('td');
            tdBodyAge.innerText = result.age;
            const tdBodyEmail = document.createElement('td');
            tdBodyEmail.innerText = result.email;
            const tdBodyRole = document.createElement('td');
            for (const role of result.authorities) {
                const p = document.createElement('p');
                p.innerText = role.role.replace("ROLE_", "");
                tdBodyRole.append(p);
            }
            trBody.append(tdBodyId);
            trBody.append(tdBodyFirstName);
            trBody.append(tdBodyLastName);
            trBody.append(tdBodyAge);
            trBody.append(tdBodyEmail);
            trBody.append(tdBodyRole);
            tbody.append(trBody);
            table.append(thead);
            table.append(tbody);
            div3.append(table);
            div2.append(div3);
            div1.append(div2);
            mainContent.append(div1);
        });
};

function adminClick() {
    fetch("/api/users/")
        .then(response => response.json())
        .then(result => {
            adminContent(result);
        });
};

function sendFormNewUser() {
    const formElement = document.getElementById('newUserForm');
    const formData = new FormData(formElement);
    fetch("/api/users/", {
        method: "POST",
        body: formData
    }).then(response => response.json())
        .then(result => {
            adminContent(result);
        });
}

function deleteUser(id){
    fetch("/api/users/" + id,{
        method : "DELETE"
    }).then(response => response.json())
        .then(result => {
            adminContent(result);
        });
}

function adminContent(result) {
    const mainContent = document.getElementById("main-content");
    const userButton = document.getElementById("user-button");
    userButton.classList.remove("active");
    const adminButton = document.getElementById("admin-button");
    adminButton.classList.add("active");
    mainContent.replaceChildren();
    const h2 = document.createElement('h2');
    h2.classList.add("text-start");
    h2.classList.add("ps-3");
    h2.innerText = "Admin panel";
    mainContent.append(h2);
    const nav = document.createElement('nav');
    const div1 = document.createElement('div');
    div1.classList.add("nav");
    div1.classList.add("nav-tabs");
    div1.id = "nav-tab";
    div1.role = "tablist";
    const buttonUsers = document.createElement('button');
    buttonUsers.classList.add("nav-link");
    buttonUsers.classList.add("active");
    buttonUsers.id = "nav-home-tab";
    buttonUsers.setAttribute("data-bs-toggle", "tab");
    buttonUsers.setAttribute("data-bs-target", "#nav-users");
    buttonUsers.setAttribute("aria-controls", "nav-home");
    buttonUsers.setAttribute("aria-selected", "true");
    buttonUsers.type = "button";
    buttonUsers.role = "tab";
    buttonUsers.innerText = "Users table";
    const buttonNewUser = document.createElement('button');
    buttonNewUser.classList.add("nav-link");
    buttonNewUser.id = "nav-profile-tab";
    buttonNewUser.type = "button";
    buttonNewUser.role = "tab";
    buttonNewUser.setAttribute("data-bs-toggle", "tab");
    buttonNewUser.setAttribute("data-bs-target", "#nav-newuser");
    buttonNewUser.setAttribute("aria-controls", "nav-profile");
    buttonNewUser.setAttribute("aria-selected", "false");
    buttonNewUser.innerText = "New user";
    div1.append(buttonUsers);
    div1.append(buttonNewUser);
    nav.append(div1);
    mainContent.append(nav);
    const div2 = document.createElement('div');
    div2.classList.add("tab-content");
    div2.id = "nav-tabContent";
    const div3 = document.createElement('div');
    div3.classList.add("tab-pane");
    div3.classList.add("fade");
    div3.classList.add("show");
    div3.classList.add("active");
    div3.id = "nav-users";
    div3.role = "tabpanel";
    div3.tabIndex = 0;
    div3.setAttribute("aria-labelledby", "nav-home-tab");
    const div4 = document.createElement('div');
    div4.classList.add("card");
    const div5 = document.createElement('div');
    div5.classList.add("card-header");
    const h6 = document.createElement('h6');
    h6.classList.add("text-start");
    h6.classList.add("ps-3");
    h6.innerText = "All users";
    div5.append(h6);
    const div6 = document.createElement('div');
    div6.classList.add("card-body");
    const tableUsers = document.createElement('table');
    tableUsers.classList.add("table");
    tableUsers.classList.add("table-striped");
    const tableUsersHead = document.createElement('thead');
    const trHead = document.createElement('tr');
    const thHeadId = document.createElement('th');
    thHeadId.scope = "col";
    thHeadId.innerText = "ID";
    const thHeadFirstName = document.createElement('th');
    thHeadFirstName.scope = "col";
    thHeadFirstName.innerText = "First Name";
    const thHeadLastName = document.createElement('th');
    thHeadLastName.scope = "col";
    thHeadLastName.innerText = "Last Name";
    const thHeadAge = document.createElement('th');
    thHeadAge.scope = "col";
    thHeadAge.innerText = "Age";
    const thHeadEmail = document.createElement('th');
    thHeadEmail.scope = "col";
    thHeadEmail.innerText = "Email";
    const thHeadRole = document.createElement('th');
    thHeadRole.scope = "col";
    thHeadRole.innerText = "Role";
    const thHeadEdit = document.createElement('th');
    thHeadEdit.scope = "col";
    thHeadEdit.innerText = "Edit";
    const thHeadDelete = document.createElement('th');
    thHeadDelete.scope = "col";
    thHeadDelete.innerText = "Delete";
    trHead.append(thHeadId);
    trHead.append(thHeadFirstName);
    trHead.append(thHeadLastName);
    trHead.append(thHeadAge);
    trHead.append(thHeadEmail);
    trHead.append(thHeadRole);
    trHead.append(thHeadEdit);
    trHead.append(thHeadDelete);
    tableUsersHead.append(trHead);
    const tbody = document.createElement('tbody');
    for (const userTable of result) {
        const trUser = document.createElement('tr');
        const tdUserId = document.createElement('td');
        tdUserId.innerText = userTable.id;
        const tdUserFirstName = document.createElement('td');
        tdUserFirstName.innerText = userTable.firstname;
        const tdUserLastName = document.createElement('td');
        tdUserLastName.innerText = userTable.lastname;
        const tdUserAge = document.createElement('td');
        tdUserAge.innerText = userTable.age;
        const tdUserEmail = document.createElement('td');
        tdUserEmail.innerText = userTable.email;
        const tdUserRole = document.createElement('td');
        for (const userTableRole of userTable.authorities) {
            const pUser = document.createElement('p');
            pUser.innerText = userTableRole.role.replace("ROLE_", "");
            tdUserRole.append(pUser);
        }
        const tdButtonEdit = document.createElement('td');
        const buttonEditUser = document.createElement('button');
        buttonEditUser.type = 'button';
        buttonEditUser.classList.add("btn");
        buttonEditUser.classList.add("btn-primary");
        buttonEditUser.setAttribute("data-bs-toggle", "modal");
        buttonEditUser.setAttribute("data-bs-target", "#editUser" + userTable.id);
        buttonEditUser.innerText = "Edit";
        tdButtonEdit.append(buttonEditUser);
        const tdButtonDelete = document.createElement('td');
        const buttonDeleteUser = document.createElement('button');
        buttonDeleteUser.type = 'button';
        buttonDeleteUser.classList.add("btn");
        buttonDeleteUser.classList.add("btn-danger");
        buttonDeleteUser.setAttribute("onclick", 'deleteUser(' + userTable.id + ');');
        buttonDeleteUser.innerText = "Delete";
        tdButtonDelete.append(buttonDeleteUser);
        trUser.append(tdUserId);
        trUser.append(tdUserFirstName);
        trUser.append(tdUserLastName);
        trUser.append(tdUserAge);
        trUser.append(tdUserEmail);
        trUser.append(tdUserRole);
        trUser.append(tdButtonEdit);
        trUser.append(tdButtonDelete);
        tbody.append(trUser);
    }
    tableUsers.append(tableUsersHead);
    tableUsers.append(tbody);
    div6.append(tableUsers);
    div4.append(div5);
    div4.append(div6);
    div3.append(div4);
    div2.append(div3);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const div7 = document.createElement('div');
    div7.classList.add("tab-pane");
    div7.classList.add("fade");
    div7.id = "nav-newuser";
    div7.role = "tabpanel";
    div7.setAttribute("aria-labelledby", "nav-profile-tab");
    div7.tabIndex = 0;
    const div8 = document.createElement('div');
    div8.classList.add("card");
    const div9 = document.createElement('div');
    div9.classList.add("card-header");
    const h6_2 = document.createElement('h6');
    h6_2.classList.add("text-start");
    h6_2.classList.add("ps-3");
    h6_2.innerText = "Add new user";
    div9.append(h6_2);
    const div10 = document.createElement('div');
    div10.classList.add("card-body");
    div10.classList.add("text-center");
    const formNewUser = document.createElement('form');
    formNewUser.id = "newUserForm";
    formNewUser.setAttribute("modelAttribute", "newuser");
    const br1 = document.createElement('br');
    const labelNewUserName = document.createElement('label');
    const strongNewUserName = document.createElement('strong');
    strongNewUserName.innerText = "Username";
    labelNewUserName.append(strongNewUserName);
    formNewUser.append(labelNewUserName);
    const div11 = document.createElement('div');
    div11.classList.add("offset-md-4");
    const inputNewUserName = document.createElement('input');
    inputNewUserName.classList.add("form-control");
    inputNewUserName.id = "username";
    inputNewUserName.name = "username";
    inputNewUserName.type = 'text';
    div11.append(inputNewUserName);
    formNewUser.append(div11);
    formNewUser.append(br1);
    const labelNewFirstName = document.createElement('label');
    const strongNewFirstName = document.createElement('strong');
    strongNewFirstName.innerText = "First name";
    labelNewFirstName.append(strongNewFirstName);
    formNewUser.append(labelNewFirstName);
    const div12 = document.createElement('div');
    div12.classList.add("offset-md-4");
    const inputNewFirstName = document.createElement('input');
    inputNewFirstName.classList.add("form-control");
    inputNewFirstName.id = "firstname";
    inputNewFirstName.name = "firstname";
    inputNewFirstName.type = 'text';
    div12.append(inputNewFirstName);
    formNewUser.append(div12);
    const br2 = document.createElement('br');
    formNewUser.append(br2);
    const labelNewLastName = document.createElement('label');
    const strongNewLastName = document.createElement('strong');
    strongNewLastName.innerText = "Last name";
    labelNewLastName.append(strongNewLastName);
    formNewUser.append(labelNewLastName);
    const div13 = document.createElement('div');
    div13.classList.add("offset-md-4");
    const inputNewLastName = document.createElement('input');
    inputNewLastName.classList.add("form-control");
    inputNewLastName.id = "lastname";
    inputNewLastName.name = "lastname";
    inputNewLastName.type = 'text';
    div13.append(inputNewLastName);
    formNewUser.append(div13);
    const br3 = document.createElement('br');
    formNewUser.append(br3);
    const labelNewAge = document.createElement('label');
    const strongNewAge = document.createElement('strong');
    strongNewAge.innerText = "Age";
    labelNewAge.append(strongNewAge);
    formNewUser.append(labelNewAge);
    const div14 = document.createElement('div');
    div14.classList.add("offset-md-4");
    const inputNewAge = document.createElement('input');
    inputNewAge.classList.add("form-control");
    inputNewAge.id = "age";
    inputNewAge.name = "age";
    inputNewAge.type = "text";
    div14.append(inputNewAge);
    formNewUser.append(div14);
    const br4 = document.createElement('br');
    formNewUser.append(br4);
    const labelNewEmail = document.createElement('label');
    const strongNewEmail = document.createElement('strong');
    strongNewEmail.innerText = "Email";
    labelNewEmail.append(strongNewEmail);
    formNewUser.append(labelNewEmail);
    const div15 = document.createElement('div');
    div15.classList.add("offset-md-4");
    const inputNewEmail = document.createElement('input');
    inputNewEmail.classList.add("form-control");
    inputNewEmail.id = "email";
    inputNewEmail.name = "email";
    inputNewEmail.type = "text";
    div15.append(inputNewEmail);
    formNewUser.append(div15);
    const br5 = document.createElement('br');
    formNewUser.append(br5);
    const labelNewPassword = document.createElement('label');
    const strongNewPassword = document.createElement('strong');
    strongNewPassword.innerText = "Password";
    labelNewPassword.append(strongNewPassword);
    formNewUser.append(labelNewPassword);
    const div16 = document.createElement('div');
    div16.classList.add("offset-md-4");
    const inputNewPassword = document.createElement('input');
    inputNewPassword.classList.add("form-control");
    inputNewPassword.id = "password";
    inputNewPassword.name = "password";
    inputNewPassword.type = "password";
    div16.append(inputNewPassword);
    formNewUser.append(div16);
    const br6 = document.createElement('br');
    formNewUser.append(br6);
    const labelNewRole = document.createElement('label');
    const strongNewRole = document.createElement('strong');
    strongNewRole.innerText = "Roles";
    labelNewRole.append(strongNewRole);
    formNewUser.append(labelNewRole);
    const div17 = document.createElement('div');
    div17.classList.add("offset-md-4");
    const selectNewRole = document.createElement('select');
    selectNewRole.classList.add("form-select");
    selectNewRole.id = "roles";
    selectNewRole.name = "roles";
    selectNewRole.multiple = true;
    fetch("/api/roles/")
        .then(response => response.json())
        .then(result => {
            for (const roleItem of result) {
                const optionRole = document.createElement('option');
                optionRole.value = roleItem.id;
                optionRole.text = roleItem.role.replace("ROLE_", "");
                selectNewRole.append(optionRole);
            }
        });
    div17.append(selectNewRole);
    formNewUser.append(div17);
    const buttonFormNewUser = document.createElement('button');
    buttonFormNewUser.type = 'button';
    buttonFormNewUser.classList.add("btn");
    buttonFormNewUser.classList.add("btn-success");
    buttonFormNewUser.innerText = "Add new user";
    buttonFormNewUser.setAttribute("onclick", "sendFormNewUser();")
    formNewUser.append(buttonFormNewUser);
    div10.append(formNewUser);
    div9.append(div10);
    div8.append(div9);
    div7.append(div8);
    mainContent.append(div2);
    mainContent.append(div7);
}

function modalEdit() {
    // <div th:each="edituser : ${users}">
    //     <div className="modal fade" id="editUser" th:attrappend="id=${''+edituser.getId()}" tabIndex="-1"
    //          aria-labelledby="exampleModalLabel"
    //          aria-hidden="true">
    //         <div className="modal-dialog">
    //             <div className="modal-content ">
    //                 <div className="modal-header">
    //                     <h1 className="modal-title fs-5" id="exampleModalLabel">Edit user</h1>
    //                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                 </div>
    //                 <div className="modal-body text-center">
    //                     <form action="/admin/save" modelAttribute="user">
    //                         <label><strong>ID</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="id" type="text" disabled
    //                                                             th:value="${edituser.getId()}"/></div>
    //                         <br/>
    //                         <label><strong>Username</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="username" type="text"
    //                                                             th:value="${edituser.getUsername()}"/></div>
    //                         <br/>
    //
    //                         <label><strong>First name</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="firstname" type="text"
    //                                                             th:value="${edituser.getFirstname()}"/></div>
    //                         <br/>
    //                         <label><strong>Last name</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="lastname" type="text"
    //                                                             th:value="${edituser.getLastname()}"/></div>
    //                         <br/>
    //
    //                         <label><strong>Age</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="age" type="number"
    //                                                             th:value="${edituser.getAge()}"/>
    //                         </div>
    //                         <br/>
    //                         <label><strong>Email</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="email" type="email"
    //                                                             th:value="${edituser.getEmail()}"/></div>
    //                         <br/>
    //                         <label><strong>Password</strong></label>
    //                         <div className="offset-md-3"><input className="form-control" name="password" type="password"
    //                                                             value=""/></div>
    //                         <br/>
    //                         <label><strong>Roles</strong></label>
    //                         <div className="offset-md-3"><select className="form-select" name="roles"
    //                                                              th:value="edituser.roles"
    //                                                              multiple>
    //                             <option th:each="role : ${allroles}"
    //                                     th:value="${role.id}"
    //                                     th:text="${role.role}"
    //                                     th:selected="${edituser.roles.contains(role)}"></option>
    //                         </select></div>
    //                         <input name="id" type="hidden" th:value="${edituser.getId()}"/>
    //                         <br/>
    //
    //                         <div className="modal-footer">
    //                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
    //                             </button>
    //                             <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Edit</button>
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
}

