// TODO: https://jsonplaceholder.typicode.com/ kullanılmaktadir


const profile = new Profile();
const ui = new UI();

// elements
const searchProfile = document.getElementById("search");



// searchProfile.addEventListener("keyup", async (e) => {
//     const text = e.target.value;
//
//     if (text !== " ") {
//         const getUser = await profile.getProfile(text);
//     }
//
// })

// TODO: Or ::
searchProfile.addEventListener("keyup",  (e) => {
    ui.clear();
    const text = e.target.value;

    if (text !== "") {
        profile.getProfile(text)
            .then(res => {
                if (res.profile.length === 0){
                    ui.showAlert(text);
                }
                else {
                    ui.showProfile(res.profile[0]);
                    profile.getTodos()
                        .then(res => ui.showTodo(res.todo));
                }
            })
            .catch(err => ui.showAlert(err));

    }

})


