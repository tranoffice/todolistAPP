export function getTodoTasks() {
    return fetch('http://127.0.0.1:3001/todotasks', {
        method: 'GET',
        mode: 'CORS'
    }).then(res => res.json())
    .catch(err => err);
}