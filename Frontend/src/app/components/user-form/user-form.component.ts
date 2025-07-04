import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  userForm!: FormGroup;
  isSubmitting = false;
  errorMessage: any;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [this.user?.id || null],
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.user ? null : Validators.required]
    });
  }

onSubmit(): void {
  if (this.userForm.invalid || this.isSubmitting) return;
  this.isSubmitting = true;

  const formData = this.userForm.value;
  const userData: User = {
    id: formData.id,
    username: formData.username,
    email: formData.email,
    password: formData.password // Always send password for new users
  };

const operation: Observable<User> = userData.id 
  ? this.userService.updateUser(userData)
  : this.userService.createUser(userData);

operation.subscribe({
  next: (result: User) => {  // Explicitly type the result
    this.activeModal.close('saved');
  },
  error: (err: HttpErrorResponse) => {  // Use HttpErrorResponse type
    console.error('API Error:', err);
    this.errorMessage = err.error?.title || 'Failed to save user';
    this.isSubmitting = false;
  },
  complete: () => {
    this.isSubmitting = false;
  }
});
}
}