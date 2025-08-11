import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.css']
})
export class BookAnAppointmentComponent {

  showEmergencyModal = false;

  emergencyNumbers = [
    { place: 'Kothapet', phone: '040 - 25365895' },
    { place: 'Kukatpally', phone: '040 - 25365895' },
    { place: 'Nampally', phone: '040 - 25365895' },
    { place: 'Vizag', phone: '040 - 25365895' },
    { place: 'Giggles - Vizag', phone: '040 - 25365895' },
    { place: 'Kurnool', phone: '040 - 25365895' },
  ];

  locations_details = [
    {
      id: 1, location_name: 'Kothapet', img: 'omni_kothapet.png'
    },
    {
      id: 2, location_name: 'Kukatpally', img: 'omni_kukatpally.png'
    },
    {
      id: 3, location_name: 'UDAI OMNI - Nampally', img: 'udai_omni.png'
    },
    {
      id: 4, location_name: 'Vizag', img: 'omni_vizag.png'
    },
    {
      id: 5, location_name: 'Giggles Vizag', img: 'giggles_vizag_building.png'
    },
    {
      id: 6, location_name: 'Kurnool', img: 'kurnool_location.png'
    }
  ]
formData = {
  fullName: '',
  phoneNumber: '',
  emailId: '',
  location: '',
  department: '',
  message: ''
};

  constructor(private router: Router, private http: HttpClient){
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // or just: window.scrollTo(0, 0);
    }
  });
  }
  
  toggleEmergencyModal() {
    this.showEmergencyModal = !this.showEmergencyModal;
  }
  
  // submitForm() {
  //   // this.router.navigate(['/thank-you']).then(success => {
  //   //   if (success) {
  //   //     console.log('Navigation to Thank you page successful');
  //   //   } else {
  //   //     console.log('Navigation failed');
  //   //   }
  //   // }).catch(error => console.error('Navigation error:', error));
  // }

submitForm() {
  const payload = {
    fullName: this.formData.fullName,
    phoneNumber: this.formData.phoneNumber,
    emailId: this.formData.emailId,
    location: this.formData.location,
    department: this.formData.department,
    message: this.formData.message
  };

  this.http.post('http://localhost:3000/signup', payload, {
    withCredentials: true
  }).subscribe({
    next: (res) => console.log('Success:', res),
    error: (err) => console.error('Error:', err)
  });
}

  goToHealthPackages(){
    this.router.navigate(['/health-checkup']).then(success => {
      if (success) {
        console.log('Navigation to Thank you page successful');
      } else {
        console.log('Navigation failed');
      }
    }).catch(error => console.error('Navigation error:', error));
  }

  routeToLocation(location:string, selected_image:string){
    const modalElement = document.getElementById('branchesModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }

  setTimeout(() => {
    this.router.navigate(['/our-branches'], {
      queryParams: {
        selected_location: location,
        selected_image:selected_image
      }
    });
  }, 300);
  }
}
