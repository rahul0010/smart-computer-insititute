var courses = document.getElementById('courses');
const url = "https://manage.smartcomputerinstitute.org/api/v1/courses";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
var msg = `<h1 class="display-5 heading-primary text-center">Courses</h1>`
fetch(proxyurl + url).then(response => {
    return response.json()
}).then(response => {
    response.forEach(course => {
        msg += `<div class="course-card">
            <img src="https://manage.smartcomputerinstitute.org/storage/course_banners/${course['image_url']}" alt="${course['name']}" class="course-card__img">
            <div class="course-card__details">
                <h3 class="course-card__heading text-center">${course['name']}</h3>
                <span class="course-card__description text-justify margin-top-small truncate">
                    Duration: ${course["duration"]} months
                </span>
            </div>
            </div>`
    });
    courses.innerHTML = msg;
})
// <span class="course-card__description text-justify margin-top-small truncate">
//     ${course["description"]}
//     <br> <a class="btn btn-outline-dark" href="course.php?id=${course["id"]}">Read More</a>
// </span>