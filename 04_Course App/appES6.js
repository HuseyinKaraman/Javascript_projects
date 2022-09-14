// Course constructor
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

// UI constructor
class UI {
    addCourseToList(course) {
        const list = document.getElementById("course-list");
        var html = `
            <tr>
                <td><img src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td> 
            </tr>
        `; // data-* attribute eklendi!
        list.insertAdjacentHTML("beforeEnd",html);
    }

    clearControls() {
        const title = document.querySelector("#title").value = "";
        const instructor = document.querySelector("#instructor").value = "";
        const image = document.querySelector("#image").value = "";
    }

    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentNode.parentNode.remove();
            return true;
        }
        return false;
    }

    showAlert(msg, className){
        const row = document.querySelector(".row");
        
        let alert = `
            <div class="alert alert-${className}">
                ${msg}
            </div>
        `;
        // beforeBegin, afterBegin, beforeEnd, afterEnd
        row.insertAdjacentHTML('beforeBegin',alert);

        setTimeout(() => {
            document.querySelector(".alert").remove();
        }, 2000);
    }
}

// Local Storage
class Storage {

    static getCourses() {
        let courses;

        if (localStorage.getItem('courses') === null){
            courses = [];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses() {
        const courses = Storage.getCourses();
        if (courses) {
            const ui = new UI;
            courses.forEach(element => {
                ui.addCourseToList(element);
            });
        }
    }

    static addCourse(course) {
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    static deleteCourse(element) {
        if (element.classList.contains('delete')) {
            const id = element.getAttribute('data-id');
           
            const courses = Storage.getCourses();
           
            courses.forEach(function (course,index) {
                if (course.courseId == id) {
                    courses.splice(index, 1);
                }
            });
            localStorage.setItem('courses',JSON.stringify(courses));
        }
    }

}


document.addEventListener('DOMContentLoaded',Storage.displayCourses);

document.getElementById("new-course").addEventListener("submit",
    function(e) {
        const title = document.querySelector("#title").value;
        const instructor = document.querySelector("#instructor").value;
        const image = document.querySelector("#image").value;
       
        // create course object
        const course = new Course(title, instructor, image);
        console.log(course);

        // create UI
        const ui = new UI();
       
       if (title === '' || instructor==='' || image==='') {
            ui.showAlert('Please complete the form!', 'warning');
       }else {
            // TODO:: save to DB

            // save to LS
            Storage.addCourse(course);

            // add course to list
            ui.addCourseToList(course);
            // clear controls
            ui.clearControls();        

            ui.showAlert('the course has been added!', 'success');
       }
       
        e.preventDefault();
});


document.getElementById('course-list').addEventListener('click', function(e) {
    const ui = new UI();
        // delete course
    if (ui.deleteCourse(e.target)) {
        // delete from LS
        Storage.deleteCourse(e.target);
    
        ui.showAlert('the course has been deleted!', 'danger');
    }
})