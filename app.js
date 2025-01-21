// Handling Stage 1: Course Selection
const nextStageButton = document.getElementById('nextStage');
nextStageButton.addEventListener('click', function() {
    const selectedCourses = getSelectedCourses();
    if (selectedCourses.length > 0) {
        showStage(2);
        suggestCourses(selectedCourses);
    } else {
        alert('لطفا حداقل یک دوره را انتخاب کنید.');
    }
});

// Handling Stage 2: Course Suggestion
const loadMoreButton = document.getElementById('loadMore');
loadMoreButton.addEventListener('click', function() {
    loadMoreCourses();
});

const finishButton = document.getElementById('finish');
finishButton.addEventListener('click', function() {
    showStage(3);
});

function getSelectedCourses() {
    const selectedCourses = [];
    document.querySelectorAll('.course-item input:checked').forEach(input => {
        selectedCourses.push(input.value);
    });
    return selectedCourses;
}

function showStage(stageNumber) {
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.remove('active');
    });
    document.getElementById(`stage${stageNumber}`).classList.add('active');
}

function suggestCourses(selectedCourses) {
    const suggestedCoursesContainer = document.querySelector('.suggested-courses');
    suggestedCoursesContainer.innerHTML = '';  // Clear previous suggestions

    const allCourses = getAllCourses();  // Assume this function returns the full course list

    const remainingCourses = allCourses.filter(course => {
        return !selectedCourses.includes(course.id);
    });

    remainingCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course-item');
        courseElement.innerHTML = `<input type="checkbox" id="${course.id}" value="${course.id}"><label for="${course.id}">${course.name}</label>`;
        suggestedCoursesContainer.appendChild(courseElement);
    });
}

function getAllCourses() {
    return [
        { id: 'course1', name: 'دوره 1' },
        { id: 'course2', name: 'دوره 2' },
        { id: 'course3', name: 'دوره 3' },
        { id: 'course4', name: 'دوره 4' },
        // Add more courses
    ];
}
