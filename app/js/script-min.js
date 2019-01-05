var courses=document.getElementById("courses");const url="https://manage.smartcomputerinstitute.org/api/v1/courses",proxyurl="https://cors-anywhere.herokuapp.com/";var msg='<h1 class="display-5 heading-primary text-center">Courses</h1>';fetch(proxyurl+url).then(s=>s.json()).then(s=>{s.forEach(s=>{msg+=`<div class="course-card">\n            <img src="https://manage.smartcomputerinstitute.org/storage/course_banners/${s.image_url}" alt="${s.name}" class="course-card__img">\n            <div class="course-card__details">\n                <h3 class="course-card__heading text-center">${s.name}</h3>\n                <span class="course-card__description text-justify margin-top-small truncate">\n                    Duration: ${s.duration} months\n                </span>\n            </div>\n            </div>`}),courses.innerHTML=msg});