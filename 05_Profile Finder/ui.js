class UI {
    constructor() {
        this.profileContainer = document.getElementById("profileContainer");
        this.alert = document.getElementById("alert");
    }


    showProfile(profile) {
        this.profileContainer.innerHTML = `
            <div class="card card-body w-50 mx-auto">
                <div class="row">
                    <div class="col-md-3"> <!-- add with placeholderimage -->
                        <a  href="https://picsum.photos/">
                            <img class="img-thumbnail" src="https://picsum.photos/300/300?random=1">
                        </a>
                    </div>
                    <div class="col-md-8">
                        <h4>Contact</h4>
                        <ul class="list-group">
                            <li class="list-group-item">
                                 name : ${profile.name}     
                            </li>
                            <li class="list-group-item">
                                 username : ${profile.username}     
                            </li>
                            <li class="list-group-item">
                                 email : ${profile.name}     
                            </li>
                            <li class="list-group-item">
                                 address : 
                                 ${profile.address.street}    
                                 ${profile.address.city} 
                                 ${profile.address.zipcode} 
                                 ${profile.address.suite}  
                            </li>
                            <li class="list-group-item">
                                 website : ${profile.website}     
                            </li>
                            <li class="list-group-item">
                                 company : ${profile.company.name}     
                            </li>
                        </ul>
                        <h4 class="mt-4">Todo list</h4>
                        <ul id="todo" class="list-group">
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    showAlert(text) {
        this.alert.innerHTML = `${text} is not found!`;
    }


    showTodo(todos) {
        let html ="";

        todos.forEach(
            todo => {
                if (todo.completed){
                    html += `
                        <li class="list-group-item bg-success">
                            ${todo.title}
                        </li>
                    `;
                }else{
                    html += `
                        <li class="list-group-item bg-secondary">
                            ${todo.title}
                        </li>
                    `;
                }
            }
        )


        this.profileContainer.querySelector("#todo").innerHTML = html;
    }

    clear() {
        this.profileContainer.innerHTML = "";
        this.alert.innerHTML = "";
    }
}