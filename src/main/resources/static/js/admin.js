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
                console.log(role.role);
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
    const mainContent = document.getElementById("main-content");
    const userButton = document.getElementById("user-button");
    userButton.classList.remove("active");
    const adminButton = document.getElementById("admin-button");
    adminButton.classList.add("active");
    mainContent.replaceChildren();
    fetch("/api/users/")
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // <h2 class="text-start ps-3">Admin panel</h2>
            const h2 = document.createElement('h2');
            h2.classList.add("text-start");
            h2.classList.add("ps-3");
            h2.innerText = "Admin panel";
            mainContent.append(h2);
            // <nav>
            const nav = document.createElement('nav');
            //     <div class="nav nav-tabs" id="nav-tab" role="tablist">
            const div1 = document.createElement('div');
            div1.classList.add("nav");
            div1.classList.add("nav-tabs");
            div1.id = "nav-tab";
            div1.role = "tablist";
            //         <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-users"
            //                 type="button" role="tab" aria-controls="nav-home" aria-selected="true">Users table
            //         </button>
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


            //         <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-newuser"
            //                 type="button" role="tab" aria-controls="nav-profile" aria-selected="false">New user
            //         </button>
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
            //     </div>
            div1.append(buttonUsers);
            div1.append(buttonNewUser);
            // </nav>
            nav.append(div1);
            mainContent.append(nav);
            // <div class="tab-content" id="nav-tabContent">
            const div2 = document.createElement('div');
            div2.classList.add("tab-content");
            div2.id = "nav-tabContent";
            //     <div class="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-home-tab"
            //          tabindex="0">
            const div3 = document.createElement('div');
            div3.classList.add("tab-pane");
            div3.classList.add("fade");
            div3.classList.add("show");
            div3.classList.add("active");
            div3.id = "nav-users";
            div3.role = "tabpanel";
            div3.tabIndex = 0;
            div3.setAttribute("aria-labelledby", "nav-home-tab");
            //         <div class="card">
            const div4 = document.createElement('div');
            div4.classList.add("card");
            //             <div class="card-header ">
            const div5 = document.createElement('div');
            div5.classList.add("card-header");
            //                 <h6 class="text-start ps-3 text-start">All users</h6>
            const h6 = document.createElement('h6');
            h6.classList.add("text-start");
            h6.classList.add("ps-3");
            h6.innerText = "All users";
            //             </div>
            div5.append(h6);
            //             <div class="card-body">
            const div6 = document.createElement('div');
            div6.classList.add("card-body");
            //                 <table class="table table-striped">
            const tableUsers = document.createElement('table');
            tableUsers.classList.add("table");
            tableUsers.classList.add("table-striped");
            //                     <thead>
            const tableUsersHead = document.createElement('thead');
            //                     <tr>
            const trHead = document.createElement('tr');
            //                         <th scope="col">ID</th>
            const thHeadId = document.createElement('th');
            thHeadId.scope = "col";
            thHeadId.innerText = "ID";
            //                         <th scope="col">First Name</th>
            const thHeadFirstName = document.createElement('th');
            thHeadFirstName.scope = "col";
            thHeadFirstName.innerText = "First Name";
            //                         <th scope="col">Last Name</th>
            const thHeadLastName = document.createElement('th');
            thHeadLastName.scope = "col";
            thHeadLastName.innerText = "Last Name";
            //                         <th scope="col">Age</th>
            const thHeadAge = document.createElement('th');
            thHeadAge.scope = "col";
            thHeadAge.innerText = "Age";
            //                         <th scope="col">Email</th>
            const thHeadEmail = document.createElement('th');
            thHeadEmail.scope = "col";
            thHeadEmail.innerText = "Email";
            //                         <th scope="col">Role</th>
            const thHeadRole = document.createElement('th');
            thHeadRole.scope = "col";
            thHeadRole.innerText = "Role";
            //                         <th scope="col">Edit</th>
            const thHeadEdit = document.createElement('th');
            thHeadEdit.scope = "col";
            thHeadEdit.innerText = "Edit";
            //                         <th scope="col">Delete</th>
            const thHeadDelete = document.createElement('th');
            thHeadDelete.scope = "col";
            thHeadDelete.innerText = "Delete";
            //                     </tr>
            trHead.append(thHeadId);
            trHead.append(thHeadFirstName);
            trHead.append(thHeadLastName);
            trHead.append(thHeadAge);
            trHead.append(thHeadEmail);
            trHead.append(thHeadRole);
            trHead.append(thHeadEdit);
            trHead.append(thHeadDelete);
            //                     </thead>
            tableUsersHead.append(trHead);
            //                     <tbody>
            const tbody = document.createElement('tbody');
            for (const userTable of result) {
                //                     <tr th:each="user :${users}">
                const trUser = document.createElement('tr');
                //                         <td th:utext="${user.getId()}">VALUE</td>
                const tdUserId = document.createElement('td');
                tdUserId.innerText = userTable.id;
                //                         <td th:utext="${user.getFirstname()}">VALUE</td>
                const tdUserFirstName = document.createElement('td');
                tdUserFirstName.innerText = userTable.firstname;
                //                         <td th:utext="${user.getLastname()}">VALUE</td>
                const tdUserLastName = document.createElement('td');
                tdUserLastName.innerText = userTable.lastname;
                //                         <td th:utext="${user.getAge()}">VALUE</td>
                const tdUserAge = document.createElement('td');
                tdUserAge.innerText = userTable.age;
                //                         <td th:utext="${user.getEmail()}">VALUE</td>
                const tdUserEmail = document.createElement('td');
                tdUserEmail.innerText = userTable.email;

                //                         <td><p th:each="role: ${user.getRoles()}"
                const tdUserRole = document.createElement('td');
                for (const userTableRole of userTable.authorities) {


                    //                                th:text="${role.getRole().replace('ROLE_','')}">VALUE</p></td>
                    const pUser = document.createElement('p');
                    pUser.innerText = userTableRole.role.replace("ROLE_", "");
                    tdUserRole.append(pUser);
                }
                //                         <td>
                const tdButtonEdit = document.createElement('td');
                //                             <button type="button" class="btn btn-primary"
                //                                     data-bs-toggle="modal"
                //                                     data-bs-target="#editUser"
                //                                     th:attrappend="data-bs-target=${''+user.getId()}">Edit
                //                             </button>
                const buttonEditUser = document.createElement('button');
                buttonEditUser.type = 'button';
                buttonEditUser.classList.add("btn");
                buttonEditUser.classList.add("btn-primary");
                buttonEditUser.setAttribute("data-bs-toggle", "modal");
                buttonEditUser.setAttribute("data-bs-target", "#editUser" + userTable.id);
                buttonEditUser.innerText = "Edit";
                //                         </td>
                tdButtonEdit.append(buttonEditUser);
                //                         <td>
                const tdButtonDelete = document.createElement('td');
                //                             <button type="button" class="btn btn-danger"
                //                                     th:attr="onclick='window.location.href = \'' + @{/admin/remove?id={id}(id=${user.getId()})} + '\''">
                //                                 Delete
                //                             </button>
                const buttonDeleteUser = document.createElement('button');
                buttonDeleteUser.type = 'button';
                buttonDeleteUser.classList.add("btn");
                buttonDeleteUser.classList.add("btn-danger");
                buttonDeleteUser.setAttribute("onclick", 'deleteUser(' + userTable.id + ');');
                buttonDeleteUser.innerText = "Delete";
                //                         </td>
                tdButtonDelete.append(buttonDeleteUser);
                //                     </tr>
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
            //                     </tbody>
            //                 </table>
            tableUsers.append(tableUsersHead);
            tableUsers.append(tbody);
            //             </div>
            div6.append(tableUsers);
            //         </div>
            div4.append(div5);
            div4.append(div6);
            //     </div>
            div3.append(div4);
            div2.append(div3);

            //     <div class="tab-pane fade" id="nav-newuser" role="tabpanel" aria-labelledby="nav-profile-tab"
            const div7 = document.createElement('div');
            div7.classList.add("tab-pane");
            div7.classList.add("fade");
            div7.id = "nav-newuser";
            div7.role = "tabpanel";
            div7.setAttribute("aria-labelledby","nav-profile-tab");
            div7.tabIndex=0;
            //          tabindex="0">
            //         <div class="card">
            const div8 = document.createElement('div');
            div8.classList.add("card");
            //             <div class="card-header ">
            const div9 = document.createElement('div');
            div9.classList.add("card-header");
            //                 <h6 class="text-start ps-3 text-start">Add new user</h6>
            const h6_2 =document.createElement('h6');
            h6_2.classList.add("text-start");
            h6_2.classList.add("ps-3");
            h6_2.innerText = "Add new user";
            //             </div>
            div9.append(h6_2);
            //             <div class="card-body text-center">
            const div10 = document.createElement('div');
            div10.classList.add("card-body");
            div10.classList.add("text-center");
            //                 <form action="/admin/add" modelAttribute="newuser">
            const formNewUser = document.createElement('form');
            formNewUser.action = "/api/users/";
            formNewUser.method = "POST";
            const br1 = document.createElement('br');
            //                     <label><strong>Username</strong></label>

            //                     <div class="offset-md-4"><input class="form-control" name="username" type="text"></div>
            const labelNewUserName = document.createElement('label');
            const strongNewUserName = document.createElement('strong');
            strongNewUserName.innerText = "Username";
            labelNewUserName.append(strongNewUserName);
            formNewUser.append(labelNewUserName);
            const div11 = document.createElement('div');
            div11.classList.add("offset-md-4");
            const inputNewUserName = document.createElement('input');
            inputNewUserName.classList.add("form-control");
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
            const  div14 = document.createElement('div');
            div14.classList.add("offset-md-4");
            const inputNewAge = document.createElement('input');
            inputNewAge.classList.add("form-control");
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
            const  div15 = document.createElement('div');
            div15.classList.add("offset-md-4");
            const inputNewEmail = document.createElement('input');
            inputNewEmail.classList.add("form-control");
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
            const  div16 = document.createElement('div');
            div16.classList.add("offset-md-4");
            const inputNewPassword = document.createElement('input');
            inputNewPassword.classList.add("form-control");
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

            //                                             <label><strong>Roles</strong></label>
            //     <div class="offset-md-4">
            //         <select class="form-select" name="roles" th:value="user.roles" multiple>
            const selectNewRole = document.createElement('select');
            selectNewRole.classList.add("form-select");
            selectNewRole.name = "roles";
            selectNewRole.multiple = true;
            fetch("/api/roles/")
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    for (const roleItem of result){
                        const optionRole = document.createElement('option');
                        optionRole.value = roleItem.id;
                        optionRole.text = roleItem.role.replace("ROLE_","");
                        selectNewRole.append(optionRole);
                    }
                });
            //             <option th:each="role : ${allroles}"
            //                     th:value="${role.id}"
            //                     th:text="${role.role}">
            //             </option>
            //         </select>
            div17.append(selectNewRole);
            //     </div>
            formNewUser.append(div17);
            //     <input name="id" type="hidden" th:value="${newuser.getId()}">
            //                                                 <br>
            //    <button type="submit" class="btn btn-success">Add new user</button>
            const buttonFormNewUser = document.createElement('button');
            buttonFormNewUser.type = 'submit';
            buttonFormNewUser.classList.add("btn");
            buttonFormNewUser.classList.add("btn-success");
            buttonFormNewUser.innerText = "Add new user";
            formNewUser.append(buttonFormNewUser);
            div10.append(formNewUser);
            div9.append(div10);
            div8.append(div9);
            div7.append(div8);
            //                 </form>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            mainContent.append(div2);
            mainContent.append(div7);

        });
};