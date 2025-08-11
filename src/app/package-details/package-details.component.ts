import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { HealthPackageService } from '../health-package.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $: any;
interface HealthPackage {
  _id: string;
  package_title: string;
  oldPrice: number;
  newPrice: number;
  description: string;
  image: string;
  location: string;
  faqs?: any[];
  package_details: string[];
  discount: number
}

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  packages: any[] = [];
  selected_map_location = "";
  appointmentForm!: FormGroup;
  modalInstance: any;
  nearestBranch: any = {};
  selectedPackageId: any;
  mapUrl: SafeResourceUrl | null = null;
  selectedPackage: HealthPackage | null = null;
  carouselPackages: HealthPackage[] = [];
  allPackages: HealthPackage[] = [];
  BRANCH_LOCATIONS: any = [
    {
      key: 'kukatpally',
      name: 'OMNI Hospitals, Kukatpally',
      lat: 17.485269683418686,
      lng: 78.4083654749371,
      address: 'Mumbai Hwy, opp. BIG BAZAR, Balaji Nagar, Kukatpally, Hyderabad, Telangana 500072',
      phone: '1234567889',
      img: "omni_kukkatpally_contact_us.svg"
    },
    {
      key: 'udai',
      name: 'Udai Omni Hospital - Orthopedics | Multispeciality | Trauma',
      lat: 17.3969257,
      lng: 78.472412,
      address: '5-9-92/A/1, Chapel Rd, near Fateh Maidan, Fateh Maidan, Abids, Hyderabad, Telangana 500001',
      phone: '1234567889',
      img: "udai_omni.svg"
    },
    {
      key: 'kothapet',
      name: 'OMNI Hospitals',
      lat: 17.3686691,
      lng: 78.538822,
      address: 'Plot No.W-11,B-9, Sy. No.9/1/A Near SVC Cinema Theatre opp PVT Market Building Kothapet, Dilsukhnagar, Hyderabad, Telangana 500036',
      phone: '1234567889',
      img: "kothapet_location_image.svg"
    },
    {
      key: 'kurnool',
      name: 'OMNI Hospitals Kurnool',
      lat: 15.823561600000001,
      lng: 78.0415378,
      address: '46/679-C, NH40, Budhawara Peta, Alluri Sitarama Raju Nagar, Kurnool, Andhra Pradesh 518002',
      phone: '1234567889',
      img: "kurnool_location_image.svg"
    },
    {
      key: 'vizag',
      name: 'OMNI RK Multi Specialty Hospital',
      lat: 17.7183946,
      lng: 83.3111361,
      address: 'RK Beach Rd, Pandurangapuram, Visakhapatnam, Andhra Pradesh 530003',
      phone: '1234567890',
      img: "vizag_location_image.svg"
    },
    {
      key: 'giggles',
      name: 'Giggles by Omni RK',
      lat: 17.718362979950925,
      lng: 83.31482030053034,
      address: 'Beside Omni Hospitals, Waltair Main Rd, Opp Lions Club Of, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002',
      phone: '1234567889',
      img: "giggles_vizag_location.svg"
    }
  ]
  constructor(
    private renderer: Renderer2,
    private health_packages: HealthPackageService,
    private activated_routes: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.valiDations()
  }
  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
    this.activatedRoutesData();
    this.getPackageDetails()
    this.healthPackageSlides();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const nearestBranch = this.BRANCH_LOCATIONS[0];
        const url = `https://maps.google.com/maps?q=${nearestBranch.lat},${nearestBranch.lng}&z=15&output=embed`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
    }
  }

  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'background-color', 'rgb(234, 232, 232)');
  }

  activatedRoutesData() {
    this.activated_routes.queryParams.subscribe(params => {
      console.log(params, 'params checking..');
      const raw = params['selected_obj'];
      this.selected_map_location = params['selected_loc'] || null;
      console.log(this.selected_map_location, 'selected_map_location checking..');

      try {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        this.selectedPackage = parsed;
        console.log(this.selectedPackage,'selectedPackage faqs checking...');
        
      } catch (e) {
        console.error('Failed to parse selected_obj', e);
        this.selectedPackage = null;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.healthPackageSlides();
    }, 0);
  }

  healthPackageSlides() {
    $('.owl-carousel').owlCarousel({
      loop: this.carouselPackages.length>2,
      margin: 16,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
        1200: { items: 5 }
      }
    });
  }


  getPackageDetails() {
    this.health_packages.getAllHealthPackagesDetails().subscribe((res: any) => {
      const data = res?.data || [];
      this.allPackages = data;
      const selected = this.selectedPackage;
      this.carouselPackages = selected
        ? this.allPackages
          .filter((pkg: HealthPackage) => pkg.package_title !== selected.package_title)
          .filter((pkg: HealthPackage) => pkg.location === this.selected_map_location)
        : data.filter((pkg: HealthPackage) => pkg.location === this.selected_map_location);
      this.cdr.detectChanges();
      setTimeout(() => this.healthPackageSlides(), 100);
    });
  }


  destroyOwlCarousel() {
    const $carousel = $('.owl-carousel');
    if ($carousel && $carousel.data('owl.carousel')) {
      $carousel.trigger('destroy.owl.carousel');
      $carousel.find('.owl-stage-outer').children().unwrap();
      $carousel.removeClass("owl-center owl-loaded owl-text-select-on");
    }
  }


  onPackageCardClick(pkg: any) {
    const prevSelected = this.selectedPackage;
    this.selectedPackage = pkg;
    this.allPackages = this.allPackages.filter(p => p._id !== pkg._id);
    if (prevSelected) {
      this.allPackages.push(prevSelected);
    }
    this.destroyOwlCarousel();

    // Delay a bit for DOM to update, then get new data and reinit carousel
    setTimeout(() => {
      this.getPackageDetails();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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
    this.appointmentForm.patchValue({ packageType: this.capitalizeText(package_type) });
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
      console.log(this.appointmentForm.value, 'values..');
      this.modalInstance.hide();
      setTimeout(() => {
        this.appointmentForm.reset();
      }, 300);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  capitalizeText(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}