import { Component, ElementRef, inject, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { armservice } from "src/app/services/arm.service";
import { CommonModule, DatePipe, formatDate } from "@angular/common";
import { CommonService } from "src/app/services/common.service";
import { SharedModule } from "src/app/shared/shared.module";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { Globals } from "src/app/globals";
import { map, Observable, startWith } from "rxjs";
import { SubSink } from "subsink/dist/subsink";

@Component({
  selector: "app-testing",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, SharedModule],
  templateUrl: "./testing.component.html",
  styleUrl: "./testing.component.css",
})
export class TestingComponent implements OnInit {
  datas: any;
  places: any[] = [];
  selectedFile: File | null = null;
  filePreview: string | null = null;

  isEditMode: boolean = false;
  editIndex: number | null = null;

  statusVal: string = "Fresh";

  attachment: any[] = [];
  headerForm: boolean = false;
  footerForm: boolean = false;
  datePipe = new DatePipe("en-US");
  dateObj = new Date();
  vouDate = this.datePipe.transform(this.dateObj, "dd-MMM-yyyy h:mm a") || "";

  //this.vouDate1 = this.datePipe.transform(this.dateObj, 'medium') || '';

  mainmenuSelceted: any[] = [];
  submitValues: any = {};

  allEntries: any[] = [];
  // Replace with the actual value or inject a GlobalsService if available
  // cmpcode: string = this.gCmpcode;
  aabname: string = "Adyar Ananda Bhavan";
  SectionTitle = "Cash Transfer";
  //Gettitle: String = 'Cash Transfer';
  // isSelect = "entryScreen";
  //   entryScreen : boolean = false;
  //   viewScreen : boolean = true;
  isSelect: string = "entryScreen";
  entryScreen: boolean = true;
  viewScreen: boolean = false;
  approveScreen: boolean = false;
  fb = inject(FormBuilder);
  globals = inject(Globals);

  isFresh: boolean = false;
  isEmpty: boolean = true;
  isDelete: boolean = false;

  isApproval: boolean = false;

  currentVouchNo: string = "";
  currentStatus: any = "";

  entry: FormGroup;
  entry1: FormGroup;
  entry2: FormGroup;
  approvalForm: FormGroup;
  CmpCode: any;
  FBname: any;
  FbCode: any;
  public routerble = "/dashboard";
  readonly fromDate = new FormControl(
    formatDate(new Date(), "yyyy-MM-dd", "en-IN")
  );
  readonly toDate = new FormControl(
    formatDate(new Date(), "yyyy-MM-dd", "en-IN")
  );

  cashcode = [{ name: "Cash Collection (Sales)" }];

  sendmode = [{ name: "By Walk" }, { name: "By Vehicle" }];
  //sendmode: any[] = [];

  status = [
    { name: "ALL" },
    { name: "Fresh" },
    { name: "Approval" },
    { name: "Reject" },
    { name: "Delete" },
  ];

  trantype = [{ name: "Cash Collection (Sales)" }];
  brname: any;
  frombrcode: any;
  selectedCashCode: any;
  branchnamecashlist: any[];
  brnames: any;
  brcodes: any;

  navigate() {
    this.router.navigate(["/AccountsEntrySL/cashTransferReceiver"]);
  }

  finBooks: string[] = [
    "ANDHRA FB",
    "DELHI FB",
    "HEAD OFFICE FB",
    "KARNATAKA FB",
    "PUDUCHERRY FB",
    "TAMILNADU FB",
    "TELANGANA FB",
  ];

  filteredFinBooks!: Observable<string[]>;

  private subs = new SubSink();

  companynamelist: any[] = [];
  finboknamelist: any[] = [];
  branchnamelist: any[] = [];
  branchnameTolist: any[] = [];

  constructor(
    private router: Router,
    private apise: CommonService,
    private CommonService: CommonService
  ) {
    this.CommonService.apiUrl = this.globals.gApiserver;
    this.CommonService.reqSendto = "datareqsarnEight";
    this.globals.gBeginTran = "";
  }
  ngOnInit(): void {
    const data = {
      name : 'test',
      age : {
        value: 10,
        unit: 'years'
      },
      address : [2,3,4]
    }
    console.log(Object.keys(data))
    console.log(Object.values(data))
    console.log(data.age.value)

    const dataSet = new Set(["apple", "banana", "orange"]);
    
    const dataMap = new Map<string, string>([["name", "John"], ["age", "30"]]);
    console.log(dataMap.get("name")); // Output: John

    this.saveToLocalStorage();
    this.loadFromLocalStorage();
    // this.apise.GetData().subscribe({
    //   next: (res: any) => {
    //     this.datas = res;
    //     this.places = res.places;
    //     console.log('Fetching data :', this.datas);
    //   },
    //   error: (err) => {
    //     console.log('Error Fetching :', err);
    //   }
    // })

    this.entry = this.fb.group({
      //cmpname : [this.aabname],
      finbok: ["", [Validators.required, this.validateFinBook.bind(this)]],
      branch: ["", Validators.required],
      ddatVou: [this.vouDate],
      CmpCode: [""],
    });

    // console.log(this.entry)
    // console.log(this.entry.value)
    // console.log(this.entry.getRawValue())

    this.entry1 = this.fb.group({
      searchBranch: ["", Validators.required],
      transferamt: ["", Validators.required],
      cashcode: ["", Validators.required],
      sendmode: ["", Validators.required],
      sndthrumod: ["", Validators.required],
      // sndthruper: ['',Validators.required],
      vehinodes: ["", Validators.required],
      authby: ["", Validators.required],
      status: [this.statusVal],
      approvedDate: [""],
      attachment: this.fb.group({
        fileName: ["", Validators.required],
        fileData: ["", Validators.required],
      }),
    });
    this.entry2 = this.fb.group({
      //cmpname : [this.aabname],
      finacebok: ["", [Validators.required, Validators.minLength(3)]],
      viewBranch: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      viewStutas: [""],
      trnType: [""],
    });

    this.approvalForm = this.fb.group({
      //cmpname : [this.aabname],
      finacebok: ["", [Validators.required, Validators.minLength(3)]],
      viewBranch: ["", Validators.required],
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      viewStutas: [""],
      trnType: [""],
    });

    this.filteredFinBooks = this.entry.get("finbok")!.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterFinBooks(value || ""))
    );

    this.getcompany();
    this.getfinbok();
    this.getFormBranch();
    this.getToBranchGL();
    this.getToBranch();
  }

  // Custom validator: checks if value exists in finBooks list

  // saveform() {

  //   this.entry.markAllAsTouched();
  //   this.entry1.markAllAsTouched();

  //   let existingData = JSON.parse(localStorage.getItem('CashTransfer') || '[]');
  //   const nextSNo = existingData.length + 1;
  //   const vouchNo = `CTVMS/2526/${nextSNo}`;

  //   // if (this.entry.valid) {
  //   //   console.log('Entry Form:', this.entry.value);
  //   // } else {
  //   //   console.warn('Entry Form Invalid');
  //   // }

  //   // if (this.entry1.valid) {
  //   //   console.log('Entry1 Form:', this.entry1.value);
  //   // } else {
  //   //   console.warn('Entry1 Form Invalid');
  //   // }

  //   if (this.entry.valid && this.entry1.valid) {
  //     this.submitValues = {
  //       SNo: nextSNo,
  //       vouchNo: vouchNo,
  //       aabname: this.aabname,
  //       entry: this.entry.value,
  //       entry1: this.entry1.value
  //     };

  //     console.log('Combined Form Data:', this.submitValues);
  //     this.saveToLocalStorage();

  //     Swal.fire({
  //   text: "Successfully Saved",
  //   icon: "success"
  // });
  //   } else {
  //     console.warn('One or both forms are invalid');
  //     Swal.fire({
  //   icon: "error",
  //   text: "Please Fill All Fileds",
  // });
  //   }

  //   this.clearall();
  //   this.selectedFile = null;

  // //both values combained
  // //   const combined = {
  // //   ...this.entry.value,
  // //   ...this.entry1.value
  // // };
  // // console.log('Combined Form Data:', combined);
  // }

  // updateStatus(status: string, vouchNo: string): void {
  //   const existingData = JSON.parse(
  //     localStorage.getItem("CashTransfer") || "[]"
  //   );

  //   // Find the index of the item that matches the given vouchNo
  //   const indexToUpdate = existingData.findIndex(
  //     (item: any) => item.vouchNo === vouchNo
  //   );

  //   if (indexToUpdate !== -1) {
  //     // Update the status in entry1
  //     existingData[indexToUpdate].entry1.status = status;

  //     // Save back to localStorage
  //     localStorage.setItem("CashTransfer", JSON.stringify(existingData));

  //     // Optional: Reflect the change in form if needed
  //     this.entry1.patchValue({ status });

  //     Swal.fire({
  //       text: `Successfully ${status === "Approved" ? "Approved" : "Rejected"}`,
  //       icon: "success",
  //     });

  //     console.log(`Status updated for vouchNo ${vouchNo}:`, status);
  //   } else {
  //     Swal.fire({ icon: "error", text: "Entry not found to update status." });
  //     console.error("No entry found for vouchNo:", vouchNo);
  //   }
  // }

  //   loadFromLocalStorage() {
  //   const storedValues = localStorage.getItem('CashTransfer');
  //   if (storedValues) {
  //     this.allEntries = JSON.parse(storedValues);  // Store data for use in template
  //     console.log('All Stored Entries:', this.allEntries);
  //   }
  //   else {
  //      console.log('All Stored else  Entries:', this.allEntries);
  //     this.allEntries = []; // fallback if no data
  //   }
  // }

  private el = inject(ElementRef)
  getcompany() {

    

    document.getElementById("finbok")?.focus();
    // {"reqMainreq":"CompanyName","Usr":"MOHANKUMAR@SWD","brcode":12345}
    this.companynamelist = [];
    const data = {
      reqMainreq: "CompanyName",
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.CommonService.reqSendto = "datareqsarnEight";
    this.subs.add(
      this.CommonService.sendReqst(data).subscribe({
        next: (res) => {
          console.log(res);

          if (res.length === 0) {
            this.CommonService.showStatusPopup("No data availabe");
          } else if (res[0].StatusResponse === "Success") {
            this.companynamelist = res;
            this.entry.controls["cmpname"]?.setValue(res[0].company);
            //this.CmpCode = res[0].CmpCode
          } else {
            this.CommonService.showStatusPopup(res[0].StatusResponse);
          }
        },
        error: (error) => {
          this.CommonService.showStatusPopup(error);
        },
        complete: () => {},
      })
    );
  }

  getfinbok() {
    this.CommonService.autoComplete(
      this.entry.get("finbok").valueChanges
    ).subscribe((data: any) => {
      let Api = {
        reqMainreq: "SR_FBSearch",
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: this.globals.gUsrDefultCmpCode,
        var2: data,
      };
      this.CommonService.reqSendto = "datareqsarnEleven";
      this.subs.add(
        this.CommonService.sendReqst(Api).subscribe({
          next: (response) => {
            if (response && response.length > 0) {
              if (response[0].StatusResponse == "Success") {
                this.finboknamelist = response;
              } else {
                this.CommonService.showStatusPopup(response[0].StatusResponse);
              }
            } else {
              // this.CommonService.showStatusPopup('No Record Found')
            }
          },
          error: (error) => {
            this.CommonService.showStatusPopup(error.message);
          },
          complete: () => {
            // this.isLoading = false;
          },
        })
      );
    });
  }

  // getFormBranch() {
  //   this.branchnamelist = [];
  //   // if (this.myForm.value.branch === '') {
  //   //     this.branchname = [];
  //   // } else {

  //   // {"reqMainreq":"VA_brSearch","Usr":"MOHANKUMAR@SWD","brcode":12345,"var2":"AABSIPL","var3":"KAFB","var1":""}  ---- datareqsarnSeventeen
  //   this.CommonService.autoComplete(
  //     this.entry.get("branch").valueChanges
  //   ).subscribe((data: any) => {
  //     let data1 = {
  //       reqMainreq: "VA_brSearch",
  //       Usr: this.globals.gUsrid,
  //       brcode: this.globals.gBrcode,
  //       var1: data,
  //       var2: this.globals.gUsrDefultCmpCode,
  //       var3: this.FbCode,
  //     };

  //     this.CommonService.reqSendto = "datareqsarnSeventeen";
  //     this.subs.add(
  //       this.CommonService.sendReqst(data1).subscribe({
  //         next: (res) => {
  //           if (res[0].StatusResponse === "Success") {
  //             this.branchnamelist = res;
  //           } else {
  //             this.branchnamelist = [];
  //             // this.CommonService.showStatusPopup(res[0].StatusRes)
  //           }
  //         },
  //         error: (error) => {
  //           this.CommonService.showStatusPopup(error.message);
  //         },
  //         complete: () => {},
  //       })
  //     );
  //   });
  //   // }
  // }

  getFormBranch() {
    this.CommonService.autoComplete(
      this.entry.get("branch").valueChanges
    ).subscribe((data: any) => {
      let data1 = {
        reqMainreq: "VA_brSearch",
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: data,
        var2: this.globals.gUsrDefultCmpCode,
        var3: this.FbCode,
      };

      this.CommonService.reqSendto = "datareqsarnSeventeen";
      this.subs.add(
        this.CommonService.sendReqst(data1).subscribe({
          next: (res) => {
            if (res[0].StatusResponse === "Success") {
              this.branchnamelist = res;
            } else {
              this.branchnamelist = [];
              // this.CommonService.showStatusPopup(res[0].StatusRes)
            }
          },
          error: (error) => {
            this.CommonService.showStatusPopup(error.message);
          },
          complete: () => {},
        })
      );
    });
  }
   getToBranchGL() {
        // this.branchnamecashlist = [];
        // this.CommonService.autoComplete(this.myForm.get('cashcode').valueChanges).subscribe((data: any) => {
        // {"reqMainreq":"LoadCashMovementGLDetail","Usr":"MOHANKUMAR@SWD","brcode":"1","var1":"AABSIPL","var2":"TNFB"} ------datareqrachnFourteen
        let data = {
            reqMainreq: "LoadCashMovementGLDetail",
            Usr: this.globals.gUsrid,
            brcode: this.frombrcode,
            var1: this.globals.gUsrDefultCmpCode,
            var2: this.FbCode,

        };
        this.CommonService.reqSendto = "datareqrachnFourteen";
        this.subs.add(this.CommonService.sendReqst(data).subscribe({
            next: (res) => {
                if (res[0].StatusRes === 'Success') {
                    // this.myForm.controls['cashcode'].setValue(res[0].AccCode);
                    //  this.myForm.controls['cashcode'].setValue(res[0].AccName);
                    this.selectedCashCode = res[0]; 
                    this.entry1.controls['cashcode'].setValue(`${res[0].AccCode} - ${res[0].AccName}`);
                    this.branchnamecashlist = res;
                } else {
                    this.branchnamecashlist = [];
                    // this.CommonService.showStatusPopup(res[0].StatusRes)
                }
            },
            error: (error) => {
                this.CommonService.showStatusPopup(error.message);
            },
            complete: () => { },
        }
        ))
        // })
    }
    getToBranch() {
        // {"reqMainreq":"GetBranchDetailForCashMovement","Usr":"MOHANKUMAR@SWD","brcode":"1","var1":"Transfer","var2":"ve","var3":"","var4":"","var5":"","var6":"","var7":"","var8":"","var9":"","var10":"","var11":"","var12":"","var13":"","var14":"","var15":"","var16":"","var17":"","var18":"","var19":"","var20":""}---datareqrachnFourteen
        this.branchnameTolist = [];
        this.CommonService.autoComplete(this.entry1.get('searchBranch').valueChanges).subscribe((data: any) => {
            let data1 = {
                reqMainreq: "GetBranchDetailForCashMovement",
                Usr: this.globals.gUsrid,
                brcode: this.frombrcode,
                var1: "Transfer",
                var2: data,
                var3: "0",
                var4: "0",
                var5: "0",
                var6: "0",
                var7: "0",
                var8: "0",
                var9: "0",
                var10: "0",
                var11: "0",
                var12: "0",
                var13: "0",
                var14: "0",
                var15: "0",
                var16: "0",
                var17: "0",
                var18: "0",
                var19: "0",
                var20: "0",

            };
            this.CommonService.reqSendto = "datareqrachnFourteen";
            this.subs.add(this.CommonService.sendReqst(data1).subscribe({
                next: (res) => {
                    this.branchnameTolist = res;
                },
                error: (error) => {
                    this.CommonService.showStatusPopup(error.message);
                },
                complete: () => { },
            }
            ))
        })
    }
      onCashCodeSelected(selectedCode: string) {
        const selectedItem = this.branchnamecashlist.find(item => item.AccCode === selectedCode);
        if (selectedItem) {
            console.log("Selected Full Object:", selectedItem);
            // Patch more fields if needed
            // this.myForm.patchValue({ cashDescription: selectedItem.CashDescrip });
        }
    }

    // toBranchEvent(e: any, data: any) {
    //     if (e.source.selected) {
    //         this.brname = data.brname;
    //         this.frombrcode = data.brcode;
    //         console.log('brname value' + this.brname);
    //         console.log('brcode value' + this.frombrcode);
    //         this.getToBranchGL();
    //     }

    // }
    BranchEvent(e: any, data: any) {
        if (e.source.selected) {
             this.brnames = data.brname;
            this.brcodes = data.brcode;
        }

    }
  ChangeChangeEvent(e: any, aru: any, name: any) {
    if (e.source.selected && e.isUserInput) {
      console.log(aru);
      if (name === "finbok") {
        this.FBname = aru.FbName;
        this.FbCode = aru.FbCode;
        document.getElementById("branch")?.focus();
      } else if (name === "branch") {
        this.entry.controls["branch"].setValue(aru.brname);
        this.entry.controls["CmpCode"].setValue(aru.CmpCode);

        if (e.source.selected) {
            this.brname = aru.brname;
            this.frombrcode = aru.brcode;
            // console.log('brname value' + this.brname);
            // console.log('brcode value' + this.frombrcode);
            this.getToBranchGL();
        }
      }
    }
  }

  validateFinBook(control: AbstractControl): ValidationErrors | null {
    const input = control.value?.toLowerCase();
    const isValid = this.finBooks.some((book) => book.toLowerCase() === input);
    return isValid ? null : { invalidFinBook: true };
  }

  private _filterFinBooks(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.finBooks.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  keytab(e: any, id: any): void {
    //console.log(e)
    if (e.key === "Enter") {
      if (e.target.value == "") {
      } else {
        document.getElementById(id)?.focus();
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement; //Typecasts the event target to HTMLInputElement to access files.
    if (input.files && input.files.length > 0) {
      //Checks if any files are selected.
      this.selectedFile = input.files[0]; //Stores the selected file in a component variable.

      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.entry1.patchValue({
          attachment: {
            fileName: reader.result ? this.selectedFile?.name : "",
            fileData: base64String,
          },
        });

        this.entry1.get("attachment")?.updateValueAndValidity();

        // console.log('📄 File Name:', this.selectedFile.name);
        // console.log('🖼️ Base64 Image:', base64String);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.filePreview = null;
      this.entry1.patchValue({ attachment: "" });
      this.entry1.get("attachment")?.updateValueAndValidity();
    }
  }

  ChangeCashCode(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Cash Code:", selectedValue);

    // if (selectedValue === "Cash Collection (Sales)") {
    //   this.sendmode = [...this.sendmode1]; // Load options into sendmode
    // } else {
    //   this.sendmode = []; // Clear options if selection is invalid or empty
    // }
  }

  ChangeSendMode(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Send Mode:", selectedValue);
  }

  ChangeStatus(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Send Mode:", selectedValue);
  }

  ChangeTranType(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Transaction Type:", selectedValue);
  }

  saveForm() {
    this.entry.markAllAsTouched();
    this.entry1.markAllAsTouched();
    let existingData = JSON.parse(localStorage.getItem("CashTransfer") || "[]");

    const nextSNo =
      this.isEditMode && this.editIndex !== null
        ? existingData[this.editIndex].SNo
        : existingData.length + 1;

    const vouchNo = `CTVMS/2526/${nextSNo}`;
    this.currentVouchNo = vouchNo; // 💡 Store it here

    if (this.entry.valid && this.entry1.valid) {
      this.submitValues = {
        SNo: nextSNo,
        vouchNo: vouchNo,
        aabname: this.aabname,
        entry: this.entry.value,
        entry1: this.entry1.value,
      };

      if (this.isEditMode && this.editIndex !== null) {
        existingData[this.editIndex] = this.submitValues;
        Swal.fire({ text: "Successfully Updated", icon: "success" });
      } else {
        existingData.push(this.submitValues);
        Swal.fire({ text: "Successfully Saved", icon: "success" });
      }

      localStorage.setItem("CashTransfer", JSON.stringify(existingData));
      this.clearall();
      this.selectedFile = null;
      this.isEditMode = false;
      this.editIndex = null;
    } else {
      console.warn("One or both forms are invalid");
      Swal.fire({ icon: "error", text: "Please Fill All Fields" });
    }
  }

  updateStatus(status: string, vouchNo: string): void {
    const existingData = JSON.parse(
      localStorage.getItem("CashTransfer") || "[]"
    );

    // Find the index of the item that matches the given vouchNo
    const indexToUpdate = existingData.findIndex(
      (item: any) => item.vouchNo === vouchNo
    );

    if (indexToUpdate !== -1) {
      // Update the status in entry1
      existingData[indexToUpdate].entry1.status = status;

      if (status === "Approved") {
        existingData[indexToUpdate].entry1.approvedDate = this.vouDate;
        this.entry1.patchValue({ approvedDate: this.vouDate });
      }

      // Save back to localStorage
      localStorage.setItem("CashTransfer", JSON.stringify(existingData));

      // Optional: Reflect the change in form if needed
      this.entry1.patchValue({ status });

      // Updated SweetAlert to handle all statuses including Delete
      let message = "";
      switch (status) {
        case "Approved":
          message = "Successfully Approved";
          break;
        case "Rejected":
          message = "Successfully Rejected";
          break;
        case "Deleted":
          message = "Successfully Deleted";
          break;
        default:
          message = `Status updated to ${status}`;
      }

      Swal.fire({
        text: message,
        icon: "success",
      });

      console.log(`Status updated for vouchNo ${vouchNo}:`, status);
      this.clearall();
      if (status === "Approved" || status === "Rejected") {
        this.isSelect = "approveScreen";
        //Passing the values that exact screen to be loaded
        this.allEntries = JSON.parse(
          localStorage.getItem("CashTransfer") || "[]"
        );
      } else {
        this.isSelect = "viewScreen";
        this.allEntries = JSON.parse(
          localStorage.getItem("CashTransfer") || "[]"
        );
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Entry not found to update status.",
      });
      console.error("No entry found for vouchNo:", vouchNo);
    }
  }

  saveToLocalStorage(): void {
    // Ensure submitValues and its nested fields are not null
    if (
      this.submitValues &&
      this.submitValues.entry &&
      this.submitValues.entry1 &&
      this.submitValues.entry1.attachment &&
      this.submitValues.entry1.attachment.fileName &&
      this.submitValues.entry1.attachment.fileData
    ) {
      const existingData = JSON.parse(
        localStorage.getItem("CashTransfer") || "[]"
      );

      // Add the new entry to the existing array
      existingData.push(this.submitValues);

      // Save the updated array back to localStorage
      localStorage.setItem("CashTransfer", JSON.stringify(existingData));

      console.log("Data saved with SNo:", this.submitValues.SNo);
    } else {
      console.warn("Cannot save: Missing required fields or attachment data");
    }
  }

  editContent(index: any, flag: any, name: any) {
    if (name === "viewSide") {
      this.headerForm = true;
      this.isFresh = true;
      this.isDelete = true;
      this.isEmpty = true;
      console.log("Header Form Disabled", name);

      const existingData = JSON.parse(
        localStorage.getItem("CashTransfer") || "[]"
      );
      const entryToEdit = existingData[index];
      if (entryToEdit) {
        this.currentVouchNo = entryToEdit.vouchNo;
        this.currentStatus = entryToEdit.entry1?.status;
      } else {
        console.warn("No entry found at index", index);
      }
    } else if (name === "approveSide") {
      this.headerForm = true;
      this.footerForm = true;
      console.log("Header and Footer Form Disabled", name);
      this.SectionTitle = "Cash Transfer Approval Screen";
      this.isFresh = true;
      this.isEmpty = false;

      const existingData = JSON.parse(
        localStorage.getItem("CashTransfer") || "[]"
      );
      const entryToEdit = existingData[index];
      if (entryToEdit) {
        this.currentVouchNo = entryToEdit.vouchNo;
        this.currentStatus = entryToEdit.entry1?.status;
      } else {
        console.warn("No entry found at index", index);
      }
    }
    console.log(flag);
    console.log(name);

    this.isEditMode = true;
    this.editIndex = index;

    console.log("Updating content for index:", index);
    this.isSelect = "entryScreen"; //To Click button to view screen
    this.SectionTitle = "Cash Transfer";
    const sNo = Number(index) + 1;
    //onst entry = this.allEntries.find(item => item.SNo === Number(index));
    const entry = this.allEntries.find((item) => item.SNo === sNo);
    console.log("Selected Entry:", entry);

    if (entry) {
      // Populate the form with the selected entry's data
      this.entry.reset();
      this.entry1.reset();

      // Patch values into forms
      this.entry.patchValue(entry.entry);
      this.entry1.patchValue(entry.entry1);
      this.entry1.patchValue({
        attachment: {
          fileName: entry.entry1.attachment.fileName,
          fileData: entry.entry1.attachment.fileData,
        },
      });

      console.log(entry.entry1.attachment.fileName);
      // console.log(entry.entry1.attachment);
      // console.log(entry.entry1.attachment.fileData);
      // console.log(entry.entry1);

      this.attachment = entry.entry1.attachment.fileName;
      console.log("Entry patched:", this.attachment);
    } else {
      console.warn("Entry not found for index:", index);
    }
  }

  viewButton() {
    this.allEntries = JSON.parse(localStorage.getItem("CashTransfer") || "[]");

    console.log(this.SectionTitle);
    this.isSelect = "viewScreen"; //To Click button to view screen
    this.SectionTitle = "Cash Transfer View";
  }

  approvedScreen() {
    console.log(this.SectionTitle);
    this.isSelect = "approveScreen";
    this.SectionTitle = "Cash Transfer Approval";
  }

  loadFromLocalStorage() {
    const storedValues = localStorage.getItem("CashTransfer");
    if (storedValues) {
      this.allEntries = JSON.parse(storedValues);
      console.log("All Stored Entries:", this.allEntries);
    }
  }

  back() {
    if (this.isSelect === "viewScreen" && this.viewScreen === true) {
      this.isSelect = "entryScreen";
      this.SectionTitle = "Cash Transfer";
    } else if (this.isSelect === "entryScreen" && this.viewScreen === false) {
      this.isSelect = "viewScreen";
      this.SectionTitle = "Cash Transfer View";
    } else {
      this.router.navigate(["/dashboard"]);
    }
  }

  allowOnlyNumbers(e: KeyboardEvent): void {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  clearall() {
    this.entry.reset();
    this.entry1.reset();
    this.aabname = "Adyar Ananda Bhavan";
    this.isSelect = "entryScreen";
    this.headerForm = false;
    this.footerForm = false;
    this.isFresh = false;
    this.isDelete = false;
    this.isEditMode = false;
    this.statusVal = "Fresh";
    this.entry1.controls["status"].setValue(this.statusVal);
    this.entry.controls["ddatVou"].setValue(this.vouDate);
  }
}

//   getfinbok() {
//     this.finboknamelist = [];
//     const data = {
//       reqMainreq: "SR_FBSearch",
//       Usr: this.globals.gUsrid,
//       brcode: this.globals.gBrcode,
//       var1: this.entry.get("CmpCode").value,
//       var2: "",
//     };
//     this.CommonService.reqSendto = "datareqsarnEleven";
//     this.subs.add(
//       this.CommonService.sendReqst(data).subscribe({
//         next: (res) => {

//           if (res.length === 0) {
//             this.CommonService.showStatusPopup("No data availabe");
//           } else if (res[0].StatusResponse === "Success") {
//             this.finboknamelist = res;
//             console.log(this.finboknamelist);
//             this.entry.controls["finbok"]?.setValue(res[0].FbName);
//             this.entry.controls["cmpname"]?.setValue(res[0].company);
//             this.CmpCode = res[0].CmpCode
//           } else {
//             this.CommonService.showStatusPopup(res[0].StatusResponse);
//           }
//         },
//         error: (error) => {
//           this.CommonService.showStatusPopup(error);
//         },
//         complete: () => {},
//       })
//     );
//   }
// }
