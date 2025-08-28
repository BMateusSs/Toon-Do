export function methodPost(body) {
    const token = localStorage.getItem('token');
    
    const method = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    };
    return method;
}

export function methodGet() {
    const token = localStorage.getItem('token');
    console.log(token)
    const method = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    return method;
}