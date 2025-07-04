import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users. Please try again later.';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }


 

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(), // Refresh the list after deletion
        error: (err) => {
          this.errorMessage = 'Failed to delete user.';
          console.error('Error:', err);
        }
      });
    }
  }



// Replace your editUser method with:
editUser(user: User): void {
  const modalRef = this.modalService.open(UserFormComponent);
  modalRef.componentInstance.user = user;
  modalRef.result.then((result) => {
    if (result === 'saved') {
      this.loadUsers(); // Refresh the list after editing
    }
  });
}

// Replace your openAddUserModal method with:
openAddUserModal(): void {
  const modalRef = this.modalService.open(UserFormComponent);
  modalRef.result.then((result) => {
    if (result === 'saved') {
      this.loadUsers(); // Refresh the list after adding
    }
  });
}
}