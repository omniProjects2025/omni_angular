import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OurSpecialitiesService } from '../our-specialities/our-specialities.service';

@Component({
  selector: 'app-our-specialities-details',
  templateUrl: './our-specialities-details.component.html',
  styleUrls: ['./our-specialities-details.component.css']
})
export class OurSpecialitiesDetailsComponent {
  specialties: any[] = [];
  selectedDepartment: any = {};
  selected_dep: string = '';
  departmentName: string = '';
  locations = [
    { id: 'kukkatpally', name: 'Kukkatpally' },
    { id: 'Nampally', name: 'UDAI OMNI - Nampally' },
    { id: 'kothapet', name: 'Kothapet' },
    { id: 'vizag', name: 'Vizag' },
    { id: 'Giggles-vizag', name: 'Giggles Vizag' },
    { id: 'kurnool', name: 'Kurnool' }
  ];
  doctors = [
    // Cardiology
    { name: 'Dr Pramod Kumar Rao', designation: 'Sr. Consultant - Cardiology', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },
    { name: 'Dr Anjali Mehra', designation: 'Consultant - Cardiology', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' },
    { name: 'Dr Ravi Sharma', designation: 'Sr. Consultant - Cardiology', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Sunita Reddy', designation: 'Cardiologist', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'kurnool' },
    { name: 'Dr Rajeev Menon', designation: 'Sr. Consultant - Cardiology', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'Giggles-vizag' },
    { name: 'Dr Ayesha Khan', designation: 'Cardiologist', department: 'Cardiology', image: 'assets/images/cardiology_doctor.png', location: 'kothapet' },

    // ENT
    { name: 'Dr Sandeep Roy', designation: 'ENT Surgeon', department: 'ENT', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },
    { name: 'Dr Pooja Iyer', designation: 'Consultant - ENT', department: 'ENT', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Nishant Rao', designation: 'Sr. ENT Specialist', department: 'ENT', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' },

    // General Medicine
    { name: 'Dr Veena Desai', designation: 'General Physician', department: 'General Medicine', image: 'assets/images/cardiology_doctor.png', location: 'kothapet' },
    { name: 'Dr Mahesh Rathi', designation: 'Sr. Consultant - General Medicine', department: 'General Medicine', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Lakshmi Rao', designation: 'Consultant - General Medicine', department: 'General Medicine', image: 'assets/images/cardiology_doctor.png', location: 'kurnool' },

    // General Surgery
    { name: 'Dr Amit Bhargava', designation: 'General Surgeon', department: 'General Surgery', image: 'assets/images/cardiology_doctor.png', location: 'Giggles-vizag' },
    { name: 'Dr Neelima Sharma', designation: 'Sr. Consultant - General Surgery', department: 'General Surgery', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' },

    // Gastroenterology
    { name: 'Dr Farhan Qureshi', designation: 'Gastroenterologist', department: 'Gastroenterology', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },
    { name: 'Dr Sheetal Agarwal', designation: 'Sr. Consultant - Gastroenterology', department: 'Gastroenterology', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },

    // Neurology
    { name: 'Dr Kavitha Menon', designation: 'Neurologist', department: 'Neurology', image: 'assets/images/cardiology_doctor.png', location: 'kothapet' },
    { name: 'Dr Ramesh Chandra', designation: 'Sr. Consultant - Neurology', department: 'Neurology', image: 'assets/images/cardiology_doctor.png', location: 'kurnool' },

    // Nephrology & Urology
    { name: 'Dr Sanjay Naik', designation: 'Urologist', department: 'Nephrology & Urology', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },
    { name: 'Dr Aruna Patil', designation: 'Nephrologist', department: 'Nephrology & Urology', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' },

    // Obstetrics & Gynaecology
    { name: 'Dr Swathi Rao', designation: 'Gynaecologist', department: 'Obstetrics & Gynaecology', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Meera Shah', designation: 'Consultant - Obstetrics', department: 'Obstetrics & Gynaecology', image: 'assets/images/cardiology_doctor.png', location: 'Giggles-vizag' },

    // Paediatrics
    { name: 'Dr Rekha Iyer', designation: 'Child Specialist', department: 'Paediatrics', image: 'assets/images/cardiology_doctor.png', location: 'kothapet' },
    { name: 'Dr Joseph Mathew', designation: 'Sr. Consultant - Paediatrics', department: 'Paediatrics', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },

    // Pulmonology
    { name: 'Dr Niharika Das', designation: 'Pulmonologist', department: 'Pulmonology', image: 'assets/images/cardiology_doctor.png', location: 'kurnool' },
    { name: 'Dr Vijay Singh', designation: 'Consultant - Pulmonology', department: 'Pulmonology', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' },

    // Psychiatry
    { name: 'Dr Shruti Kaur', designation: 'Psychiatrist', department: 'Psychiatry', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Rohit Das', designation: 'Sr. Consultant - Psychiatry', department: 'Psychiatry', image: 'assets/images/cardiology_doctor.png', location: 'kothapet' },

    // Orthopaedics & Sports Medicine
    { name: 'Dr Ashok Verma', designation: 'Orthopaedic Surgeon', department: 'Osthopaedics & Sports Medicine', image: 'assets/images/cardiology_doctor.png', location: 'kukkatpally' },
    { name: 'Dr Sneha Menon', designation: 'Consultant - Sports Medicine', department: 'Osthopaedics & Sports Medicine', image: 'assets/images/cardiology_doctor.png', location: 'Giggles-vizag' },

    // Vascular Surgery
    { name: 'Dr Mohit Chawla', designation: 'Vascular Surgeon', department: 'Vascular Surgery', image: 'assets/images/cardiology_doctor.png', location: 'vizag' },
    { name: 'Dr Nisha Rao', designation: 'Consultant - Vascular Surgery', department: 'Vascular Surgery', image: 'assets/images/cardiology_doctor.png', location: 'Nampally' }
  ];


  searchName = '';
  selectedLocation = '';
  filteredDoctors = [...this.doctors];
  // selectedLocation = this.locations[0];
  constructor(private activated_routes: ActivatedRoute, private specialitiesService: OurSpecialitiesService
  ) {
    this.activatedRoutesData();
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.getAllSpecialities();
  }

  activatedRoutesData() {
    this.activated_routes.queryParams.subscribe(params => {
      console.log(params,'params....');
      this.departmentName = params['selected_speciality'] || 'N/A';
      if (this.specialties?.length) {
        this.setSelectedDepartmentByName(this.departmentName);
      }
      // console.log(res, 'params...');
      // try {
      //   this.selectedDepartment = res['selected_obj'] ? JSON.parse(res['selected_obj']) : {};
      //   console.log(this.selectedDepartment, 'selectedDepartment...');
      // } catch (err) {
      //   this.selectedDepartment = {};
      //   console.error('Failed to parse selected_obj:', err);
      // }

      this.selected_dep = this.selectedDepartment._id || '';
      this.departmentName = this.selectedDepartment.name || 'N/A';

      console.log(this.departmentName, 'departmentName...');
      this.filterDoctors();  // call filter immediately
    });
  }

  setSelectedDepartmentByName(name: string) {
    const matched = this.specialties.find(dep => dep.name?.toLowerCase() === name?.toLowerCase());
    this.selectedDepartment = matched || {};
    this.selected_dep = matched?._id || '';
    console.log(this.selectedDepartment, 'matched department...');
    this.filterDoctors();  // apply filtering logic
  }


  get filteredDepartments(): any[] {
    return this.selectedDepartment && Object.keys(this.selectedDepartment).length
      ? [this.selectedDepartment]
      : [];
  }

  getDepartmentName(): string {
    return this.selectedDepartment?.name || '';
  }



  filterDoctors(): void {
    const name = this.searchName.trim().toLowerCase();
    const location = this.selectedLocation;
    const department = this.departmentName.trim().toLowerCase();

    let tempDoctors = [...this.doctors];

    // First: Filter by department if available
    if (department) {
      tempDoctors = tempDoctors.filter(doctor =>
        doctor.department.toLowerCase() === department
      );
    }

    // Then: Filter by name and location
    this.filteredDoctors = tempDoctors.filter(doctor => {
      const matchName = !name || doctor.name.toLowerCase().includes(name);
      const matchLocation = !location || doctor.location === location;
      return matchName && matchLocation;
    });
  }

  getAllSpecialities() {
    this.specialitiesService.getAllSpecialities().subscribe(
      res => {
        this.specialties = res?.SpecialtyData || [];
        this.activatedRoutesData();
      },
      err => {
        console.error('Error:', err);
      }
    );
  }

}