import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Iuser {
    name: string,
    email: string,
    password: string
}

export interface Ilogin {
    email: string,
    password: string
}

export interface Itask {
    user_id: string,
    title: string,
    description: string,
    status: number,
    expire_date: Date,
    category: number
}

export interface IupdateSubtask {
    task_id: string,
    subtask_id: string,
    check: boolean
}

export interface Icomment {
    name: string,
    content: string,
    user_id: string
}

@Injectable({
    providedIn: 'root'
})

export class TuduService {

    private apiURL = 'http://localhost:3000'

    constructor(private http: HttpClient) { }

    createUser(user: Iuser) {
        return this.http.post(`${this.apiURL}/users`, { user });
    }

    userLogin(login: Ilogin): Observable<any> {
        return this.http.post(`${this.apiURL}/sign_in`, { sign_in: login });
    }

    listAllTasks(user_id: string) {
        return this.http.get(`${this.apiURL}/user_tasks/${user_id}`)
    }

    listByTask(task_id: string) {
        return this.http.get(`${this.apiURL}/tasks/${task_id}`)
    }

    createTask(task: Itask) {
        return this.http.post(`${this.apiURL}/tasks`, { task });
    }

    updateTask(task_id: string, status: number) {
        return this.http.patch(`${this.apiURL}/tasks/${task_id}`, {
            task: {
                status
            }
        })
    }

    createSubtask(task_id: string, description: string) {
        return this.http.post(`${this.apiURL}/tasks/${task_id}/subtask`, {
            task: {
                description
            }
        })
    }

    updateSubtask({ task_id, subtask_id, check }: IupdateSubtask) {
        return this.http.patch(`${this.apiURL}/tasks/${task_id}/subtask/${subtask_id}`, {
            subtask: {
                check
            }
        })
    }

    createComment(comment: Icomment, task_id: string) {
        return this.http.post(`${this.apiURL}/tasks/${task_id}/comments`, { comment });
    }

    listAllComments(task_id: string) {
        return this.http.get(`${this.apiURL}/tasks/${task_id}/comments`);
    }
}