import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharedService } from '../shared/behaviour-subject/data-shared.service';
import { EmployeeService } from '../shared/employee.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  submitted: boolean = false;

  selectedFile: any;
  uploadedImage: any;

  /*########################## File Upload ########################*/
  // @ViewChild('fileInput', null) el: ElementRef;

  @ViewChild('fileInput', { static: false }) el: ElementRef;
  fileInput?: ElementRef<HTMLElement>;

  imageUrl: any = '../../../assets/profile.jpeg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  country_name: any;
  state_name: any;
  city_name: any; 

  states: any;
  cities: any;
  selectedCountry: any;
  private mode = 'create';


  updated_employees: any = {
    _id: '',
    photo: "",
    status: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    gender: "",
    age: "",
    merital_status: "",
    country: "",
    state: "",
    city: "",

    mobile: "",

    address: "",
    checkin: "",
    checkout: "",
  };

  gender = ['Male', 'Female', 'Others'];

  merital_status_arr = ['Single', 'Merried', 'Divorced', 'Others'];


  language_skills_arr = [
    'Student',
    'Sports man',
    'Politician',
    'Actor/Actress',
    'Employee',
    'Worker',
  ];

  Countries: Array<any> = [
    {
      name: 'India', states: [
        {
          name: 'Maharashtra', cities:
            ['Pune', 'Mumbai', 'Nagpur', 'Solapur', 'Kolhapur', 'Latur', 'Shirdi']
        },
        {
          name: 'Madhya Pradesh', cities:
            ['Bhopal', 'Indore', 'Vidisha', 'Raisen', 'Sagar', 'Shehore', 'Basoda']
        },
        {
          name: 'Delhi', cities:
            ['New Delhi', 'East Delhi', 'West Delhi', 'North Delhi', 'South Delhi']
        },
        {
          name: 'Karnataka', cities:
            ['Bagalkot', 'Belagavi', 'Bijapur', 'Dharwad', 'Gadag', 'Bangalore Rural', 'Mysore']
        }
      ]
    },
    {
      name: 'Spain',
      states: [
        {
          name: 'Barcelona',
          cities: [
            'Madrid', ' Catalan Revolt ', ' Isabella I of Castile', 'Catalonia']
        },
        {
          name: 'Alava',
          cities: [
            'Victoria Gasteiz', 'Laguardia', 'Anana', 'Betono']
        },
        {
          name: 'Almeria',
          cities: [
            'Harmour of almeria', 'Rail station of almeria', 'east almeria', 'New almeria']
        },
        {
          name: 'Biskay',
          cities: [
            'Bilbao', ' Guernica', 'Bermeo', 'Durango']
        }
      ]
    },
    {
      name: 'USA',
      states: [
        {
          name: 'California',
          cities:
            ['Los Angeles', '	Alameda', 'Orange', 'San Bernardino']
        },
        {
          name: 'Verginia',
          cities:
            ['Rchmond', 'Berginia Beach', 'Roanoke', 'Alexandria']
        },
        {
          name: 'Alaska',
          cities:
            ['Anchorage', 'Sitka', 'North Pole', 'Homer']
        },
        {
          name: 'Mary Land',
          cities:
            ['Baltimore', 'Annapolis', 'Ocean City', 'Frederick', 'Rockville', 'Silver Spring']
        },
        {
          name: 'Florida',
          cities:
            ['Miami', 'Orlando', 'Kack Son Ville', 'Tampa', 'Florida City', 'Naples']
        },
        {
          name: 'Georgia',
          cities:
            ['Atlanta', 'Savannnah', 'Athens', 'Macon', 'Marrietta', 'Alpharetta']
        },
      ]
    }];

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private cd: ChangeDetectorRef,
    private behaviourSub: DataSharedService
  ) { }

  ngOnInit() {

    // Getting single product using behaviour subject
    this.behaviourSub.employee_source.subscribe((single_employee:any)=> {
      this.updated_employees = single_employee; 
      this.country_name = single_employee.country;
      this.state_name = single_employee.state;
      this.city_name = single_employee.city;

      if (single_employee !== undefined) { 
        this.mode = 'update';
      }
    })


    this.employeeForm = this.formBuilder.group({
      photo: ['', [Validators.required]],
      status: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      dob: ['', [Validators.required]],

      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
      merital_status: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],

      city: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      checkin: ['', [Validators.required]],
      checkout: ['', [Validators.required]],
    });

     //****************** Patch single product *****************
     this.employeeForm.patchValue({
      first_name: this.updated_employees.first_name,
      last_name: this.updated_employees.last_name,
      // photo: this.updated_employees.photo,
      status: this.updated_employees.status,
      email: this.updated_employees.email,
      dob: this.updated_employees.dob,
      gender: this.updated_employees.gender,
      age: this.updated_employees.age,
      merital_status: this.updated_employees.merital_status,
      country: this.updated_employees.country,
      state: this.updated_employees.state,
      city: this.updated_employees.city,
      mobile: this.updated_employees.mobile,
      address: this.updated_employees.address,
      checkin: this.updated_employees.checkin,
      checkout: this.updated_employees.checkout,
    }); 
  }

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let user_image = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(user_image);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log('imageUrl=====>', this.imageUrl);

        this.employeeForm.patchValue({
          file: reader.result,
        });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl =
      'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.employeeForm.patchValue({
      photo: [null],
    });
  }

  // ************ Change Country state selection dynamically *************
  changeCountry(country) {
    this.states = this.Countries.find((cntry) => cntry.name == country).states;
  }

  // ************ Change state city selection dynamically *************
  changeState(state) {
    // debugger
    this.cities = this.Countries.find(
      (cntry) => cntry.name == this.selectedCountry
    ).states.find((stat) => stat.name == state).cities;
  }

  // onSubmit
  onSubmit(empForm: any) {
    this.submitted = true;
    let employeeProfile = {
      photo: empForm.value.photo,
      status: empForm.value.status,
      first_name: empForm.value.first_name,
      last_name: empForm.value.last_name,
      email: empForm.value.email,
      dob: empForm.value.dob,
      gender: empForm.value.gender,
      age: empForm.value.age,
      merital_status: empForm.value.merital_status,
      country: empForm.value.country,
      state: empForm.value.state,
      city: empForm.value.city,

      mobile: empForm.value.mobile,

      address: empForm.value.address,
      checkin: empForm.value.checkin,
      checkout: empForm.value.checkout,
    };
    // this.empService.addEmployee(employeeProfile); 

    // if (this.productForm.invalid) {
    //   return;
    // }
    // this.isLoading = true;
    if (this.mode === 'create') { 
      this.empService.addEmployee(employeeProfile);
    } else {
      console.log('updated mode call');

      let update_single_employee = {
        _id: this.updated_employees._id,
        photo: empForm.value.photo,
        status: empForm.value.status,
        first_name: empForm.value.first_name,
        last_name: empForm.value.last_name,
        email: empForm.value.email,
        dob: empForm.value.dob,
        gender: empForm.value.gender,
        age: empForm.value.age,
        merital_status: empForm.value.merital_status,
        country: empForm.value.country,
        state: empForm.value.state,
        city: empForm.value.city,
  
        mobile: empForm.value.mobile,
  
        address: empForm.value.address,
        checkin: empForm.value.checkin,
        checkout: empForm.value.checkout,
      };
      this.empService.updateEmployee(update_single_employee);
    }

  }
}
