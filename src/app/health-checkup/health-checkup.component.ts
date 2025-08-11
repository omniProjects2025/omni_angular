import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HealthPackageService } from '../health-package.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-health-checkup',
  templateUrl: './health-checkup.component.html',
  styleUrls: ['./health-checkup.component.css']
})
export class HealthCheckupComponent {
  discount: string = '';
  appointmentForm!: FormGroup;
  modalInstance: any;
  locations: string[] = ['All Packages', 'Kothapet', 'Kukatpally', 'Nampally', 'Vizag', 'Kurnool'];
  selected: string = 'All Packages';
  allPackages: any = {};
  displayedPackages: any[] = [];

  constructor(private router: Router, private renderer: Renderer2, private fb: FormBuilder, private http: HttpClient, private healthpackagesdetails: HealthPackageService) {
    this.valiDations()
  }
  ngOnInit() {
    this.getHealthPackageDetails();
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  getHealthPackageDetails() {
    this.healthpackagesdetails.getAllHealthPackagesDetails().pipe(take(1)).subscribe((response: any) => {
      if (Array.isArray(response.data)) {
        const packageArray = response.data;
        const grouped = packageArray.reduce((acc: any, pkg: any) => {
          const loc = pkg.location || 'Others';
          if (!acc[loc]) {
            acc[loc] = [];
          }
          acc[loc].push(pkg);
          return acc;
        }, {});
        this.allPackages = grouped;
        this.locations = ['All Packages', ...Object.keys(grouped)];
        this.displayAllPackages();
      } else {
        console.error('Expected array but got:', response);
      }
    });
  }


  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'background-color', 'rgb(234, 232, 232)');
  }

  getDiscount(oldPrice: number, newPrice: number): string {
    return ((1 - newPrice / oldPrice) * 100).toFixed(0) + '% Off';
  }


  viewPackageDetails(selected_obj: any) {
    console.log(selected_obj,'selected_obj...');
    
    this.router.navigate(['/package-details'], {
      queryParams: {
        selected_obj: JSON.stringify(selected_obj),
        selected_loc: this.selected
      }
    });
  }

  valiDations() {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      packageType: new FormControl('', Validators.required)

    });
  }

  bookAppointment(id: number, package_type: any) {
    this.appointmentForm.patchValue({ packageType: package_type });
    const modalElement = document.getElementById('appointmentModal');
    if (modalElement) {
      modalElement.removeAttribute('inert');
      this.modalInstance = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
      this.modalInstance.show();
      setTimeout(() => {
        document.querySelector('.modal-backdrop')?.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.8) !important;');
      }, 100);
    }
  }

  submitForm() {
    if (this.appointmentForm.valid) {
      alert('Appointment Booked Successfully!');
      this.modalInstance.hide();
      setTimeout(() => {
        this.appointmentForm.reset();
      }, 300);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  selectLocation(location: string) {
    this.selected = location;
    if (location === 'All Packages') {
      this.displayAllPackages();
    } else {
      this.displayedPackages = this.allPackages[location] || [];
      console.log(this.displayedPackages, 'displayedPackages locations..');

      if (this.displayedPackages.length === 0) {
        console.warn(`No packages found for location: ${location}`);
      }
    }
  }

  displayAllPackages() {
    console.log(this.displayedPackages, 'location wise data displaying...');
    this.displayedPackages = Object.entries(this.allPackages)
      .filter(([key]) => key !== 'All Packages')
      .flatMap(([_, value]) => value);
  }
}
