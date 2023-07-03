import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators, ValidatorFn, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import * as cnst from '../constants';
import { NumeralUtil } from './numeral.util';
import { AlertService, AuthenticationService, CommonService } from 'src/app/common/services';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class FormUtil {

    constructor(
        private commonService: CommonService,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) { }

    /**
    * Return formControl valid indicator
    * @param formControl - FormControl
    */
    isFormControlInvalid(formControl) {
        if (formControl) {
            return formControl.invalid && (formControl.dirty || formControl.touched);
        }
    }

    getRowSpan(col, index, spans) {
        return spans[index] && spans[index][col];
    }
    updateForm(data, key, spans) {
        for (let i = 0; i < data.length; i++) {
            if (this.getRowSpan(key, i, spans)) {
                let temp = data[i][key];
                for (let j = 1; j < this.getRowSpan(key, i, spans); j++) {
                    data[j][key] = temp;
                }
            }
        }
    }

    buildParamsWithAttachmentsFormData(params: any, docs: any) {
        var formData = new FormData();
        if (params) {
            Object.keys(params).forEach(key => { formData.append(key, params[key]) });
        }

        const files: Array<File> = docs;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]['file']);
                formData.append("fileDescription", files[i]['fileDescription']);
                formData.append("docType", files[i]['docType']);
            }
        }
        return formData;
    }

    buildAttachmentFormDataByType(type, file) {
        var formDataObj = new FormData();
        formDataObj.append('docType', type);
        formDataObj.append('file', file);
        return formDataObj;
    }

    buildAttachmentFormData(attachment: any) {
        var formData = new FormData();
        Object.keys(attachment).forEach(key => {
            if (attachment[key] != null) {
                formData.append(key, attachment[key]);
            }
        });
        return formData;
    }

    /**
* Update all controls in a form group
* @param formGroup - The form group to update
*/
    validateAllFormControl(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).map(x => formGroup.controls[x]).forEach(control => {
            control.updateValueAndValidity();
            if ((control as UntypedFormGroup).controls) {
                this.validateAllFormControl((control as UntypedFormGroup));
            }
        });
    }

    validateAllFormFields(formGroup: UntypedFormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof UntypedFormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof UntypedFormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    removeAllValidators(form: UntypedFormGroup) {
        Object.keys(form.controls).map(x => form.controls[x]).forEach(control => {
            control.clearValidators();
            control.updateValueAndValidity();
            if ((control as UntypedFormGroup).controls) {
                this.removeAllValidators((control as UntypedFormGroup));
            }
        });
    }

    getFormValidationErrors(form: UntypedFormGroup) {
        Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    // This is intentional
                });
            }
        });
    }

    /**
  * Marks all controls in a form group as touched
  * @param formGroup - The form group to touch
  */
    markFormGroupTouched(formGroup: UntypedFormGroup) {
        formGroup.markAsTouched();
        Object.keys(formGroup.controls).map(x => formGroup.controls[x]).forEach(control => {
            control.markAsTouched();

            if ((control as UntypedFormGroup).controls) {
                this.markFormGroupTouched((control as UntypedFormGroup));
            }
        });
    }

    unionList(list, key, unionMap: Map<string, string>) {
        let retVal = "";
        if (list) {
            let listSize = JSON.stringify(list).replace("[]", "").length;
            if (listSize && key) {
                list.forEach(element => {
                    if (element.key == key) {
                        retVal = element.label;
                    }
                });

                if (retVal === "") {
                    if (unionMap.get(key) == null) {
                        unionMap.set(key, key);
                        this.commonService.getFormList(key).subscribe(data => {
                            if (data[0]) {
                                list.push(data[0]);
                            }
                        });
                    }
                }
            }
        }
        return list;
    }

    // unionTradeList(list, key, unionMap: Map<string, string>) {
    //     let retVal = "";
    //     if (list) {
    //         let listSize = JSON.stringify(list).replace("[]", "").length;
    //         if (listSize && key) {
    //             list.forEach(element => {
    //                 if (element.key == key) {
    //                     retVal = element.label;
    //                 }
    //             });

    //             //for inactive trade
    //             if (retVal === "") {
    //                 if (unionMap.get(key) == null) {
    //                     unionMap.set(key, key);
    //                     this.commonService.getTradesByKey(key).subscribe(data => {
    //                         if (data[0]) {
    //                             list.push(data[0]);
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     return list;
    // }

    // unionStatusList(list, key, unionMap: Map<string, string>) {
    //     let retVal = "";
    //     if (list) {
    //         let listSize = JSON.stringify(list).replace("[]", "").length;
    //         if (listSize && key) {
    //             list.forEach(element => {
    //                 if (element.key == key) {
    //                     retVal = element.label;
    //                 }
    //             });

    //             //for inactive status
    //             if (retVal === "") {
    //                 if (unionMap.get(key) == null) {
    //                     unionMap.set(key, key);
    //                     this.commonService.getFormStatusList(key).subscribe(data => {
    //                         if (data[0]) {
    //                             list.push(data[0]);
    //                         }
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     return list;
    // }

    unionArrayList(list, key, tempList: Map<string, string>) {
        if (list) {
            let listSize = JSON.stringify(list).replace("[]", "").length;
            if (listSize && key) {
                key.forEach(keyElement => {
                    let retVal = "";
                    list.forEach(element => {
                        if (element.key == keyElement) {
                            retVal = element.label;
                        }
                    });

                    //for inactive status
                    if (retVal === "" && keyElement) {
                        if (tempList.get(keyElement) == null) {
                            tempList.set(keyElement, keyElement);
                            this.commonService.getFormList(keyElement).subscribe(data => {
                                if (data[0]) {
                                    list.push(data[0]);
                                }
                            });
                        }
                    }
                });
            }
        }
        return list;
    }

    /**
    * Return the label of the code
    * @param list - The code list
    *  @param key - The code 
    */
    getLabelFromKey(list, key) {
        var retVal = "";
        if (list) {
            list.forEach(element => {
                if (element.key == key) {
                    retVal = element.label;
                }
            });
        }
        return retVal;
    }

    getDataFromKey(list, key) {
        var retVal = "";
        if (list) {
            list.forEach(element => {
                if (element.key == key) {
                    retVal = element.data;
                }
            });
        }
        return retVal;
    }

    setDisplayValueWhenNull(value) {

        return this.setDisplayValueWhenNullWithValue(value, null);
    }

    setDisplayValueWhenNullWithValue(value, displayValue) {
        if (!displayValue) {
            displayValue = '-';
        }

        if (!value) {
            value = displayValue;
        }
        return value;
    }

    /**
        * Return the form group for file dto
        * @param fb - FormBuilder
        * @param x - file data
        * @param isRequired - is file required
        */
    populateFileFormGroup(fb: UntypedFormBuilder, x, isRequired: boolean) {
        return fb.group({
            fileId: x ? x.fileId : [],
            filename: [x ? x.filename : []],
            originalFilename: [x ? x.originalFilename : [], isRequired ? Validators.required : ''],
            fileSize: x ? x.fileSize : [],
            extension: x ? x.extension : [],
            title: x ? x.title : [],
            contentType: x ? x.type : [],
            description: x ? x.description : [],
            hash: x ? x.hash : [],
            documentTypeKey: [x ? x.documentTypeKey : [], isRequired ? Validators.required : ''],
            url: x ? x.url : [],
            createdDate: x ? x.createdDate : [],
            createdBy: x ? x.createdBy : [],
        });
    }

    /**
       * Return the form group with no file data for file dto
       * @param file - FormGroup
       * 
       */
    clearFileDetails(file) {
        file.get('fileId').patchValue('');
        file.get('originalFilename').patchValue('');
        file.get('filename').patchValue('');
        file.get('url').patchValue('');
        file.get('fileSize').patchValue('');
        file.get('extension').patchValue('');
        file.get('hash').patchValue('');
    }


    populatelistableFormGroup(fb: UntypedFormBuilder, listableDto, isRequired: boolean) {
        return fb.group({
            key: [listableDto ? listableDto.key : '', isRequired ? Validators.required : ''],
            label: listableDto ? listableDto.label : '',
            otherLabel: listableDto ? listableDto.otherLabel : '',
            type: listableDto ? listableDto.type : '',
        });
    }

    populateAddressFormGroup(fb: UntypedFormBuilder, x, isRequired: boolean) {
        return (
            fb.group({
                addressId: x ? x.addressId : [],
                postal: [x ? x.postal : [], isRequired ? Validators.required : ''],
                street: [x ? x.street : [], isRequired ? Validators.required : ''],
                building: x ? x.building : [],
                block: [x ? x.key : [], isRequired ? Validators.required : ''],
                floor: [x ? x.key : [], isRequired ? Validators.required : ''],
                unit: [x ? x.key : [], isRequired ? Validators.required : ''],
                premisesType: this.populatelistableFormGroup(fb, x.premisesType, isRequired),
                type: this.populatelistableFormGroup(fb, x.premisesType, isRequired),
                foreignLine1: x ? x.foreignLine1 : [],
                foreignLine2: x ? x.foreignLine2 : [],
                foreignLine3: x ? x.foreignLine3 : [],
            })
        )
    }

    /**
        * Return the form group for CorrespondenceForm
        * @param form - FormGroup
        *  @param isSingPass - is logged in via singPass
        *  @param isRequired - is control required
        */
    populateCorrespondenceFormGroup(fb: UntypedFormBuilder, x, isRequired: boolean, isSingPass: boolean) {
        var user = this.authenticationService.currentUserValue;

        return (
            fb.group({
                uin: [user ? user.loginId : '', isRequired ? Validators.required : []],
                uen: [user ? user.uen : '', isSingPass ? [] : Validators.required],
                correspondenceName: [x ? x.correspondenceName : '', isRequired ? Validators.required : []],
                correspondenceBlock: [x ? x.correspondenceBlock : '', isRequired ? Validators.required : []],
                correspondenceStreet: [x ? x.correspondenceStreet : '', isRequired ? Validators.required : []],
                correspondenceLevelNo: [x ? x.correspondenceLevelNo : '', [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.required]],
                correspondenceUnitNo: [x ? x.correspondenceUnitNo : '', [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.required]],
                correspondencePostalCode: [x ? x.correspondencePostalCode : '', [isRequired ? Validators.required : [], Validators.pattern("^[0-9]{6}$")]],
                correspondenceTelNo: [x ? x.correspondenceTelNo : '', [Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[6|8|9][0-9]{7}$")]],
                correspondenceMobNo: [x ? x.correspondenceMobNo : '', [isRequired ? Validators.required : [], Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[9|8][0-9]{7}$")]],
                correspondenceEmail: [x ? x.correspondenceEmail : '', [isRequired ? Validators.required : [], ValidateEmail]],
                correspondenceHanyuPinyin: [x ? x.correspondenceHanyuPinyin : '', Validators.pattern("^[a-zA-Z0-9,.?@ ]*$")],
                correspondenceSex: [x ? x.correspondenceSex : '', [isRequired ? Validators.required : [], ValidateGender]],
                correspondenceNationality: [x ? x.correspondenceNationality : '', [isRequired ? Validators.required : []]],
                correspondenceRegisteredAddress: [x ? x.correspondenceRegisteredAddress : '', [isRequired ? Validators.required : []]],
                correspondenceBldgName: [x ? x.correspondenceBldgName : ''],
                dataIsMyInfo: [x ? x.dataIsMyInfo : false],
                dataIsEdh: [x ? x.dataIsEdh : false],
            })
        )
    }

    
    idComparator(o1: any, o2: any): boolean {
        if (o1 && o2) {
            return o1.id === o2.id;
        } else {
            return false;
        }
    }

    keyComparator(o1: any, o2: any): boolean {
        if (o1 && o2) {
            return o1.id === o2.id;
        } else {
            return false;
        }
    }

    /**
    * Return the form group with patched data if not null
    * @param form - FormGroup
    *  @param data - Myinfo data
    *  
    */
    setMyInfoData(form: UntypedFormGroup, data) {
        form.get('dataIsMyInfo').setValue(data ? true : false);
        form.get('correspondenceName').setValue((data ? this.camelCase(data.name) : ''));
        form.get('correspondenceMobNo').setValue(data ? data.mobileNo : '');
        form.get('correspondenceEmail').setValue(data ? data.email : '');
        form.get('correspondenceBlock').setValue(data ? data.regAddBlock : '');
        form.get('correspondenceStreet').setValue(data ? data.regAddStreet : '');
        form.get('correspondenceLevelNo').setValue(data ? data.regAddFloor : '');
        form.get('correspondenceUnitNo').setValue(data ? data.regAddUnit : '');
        form.get('correspondenceBldgName').setValue(data ? data.regAddBuilding : '');
        form.get('correspondencePostalCode').setValue(data ? data.regAddPostal : '');
        form.get('correspondenceHanyuPinyin').setValue(data ? data.hanyupinyinname : '');
        form.get('correspondenceSex').setValue(data ? data.sex : '');
        form.get('correspondenceNationality').setValue(data ? data.nationality : '');
        form.get('correspondenceRegisteredAddress').setValue(data ? data.regAddBlock + " " + data.regAddStreet + " " + data.regAddFloor + "-" + data.regAddUnit + ' Singapore ' + data.regAddPostal : '');
        if (form.get('dataIsMyInfo').value) {
            form.disable();
        } else {
            form.enable();
            form.get('uen').disable();
            form.get('uin').disable();
        }
    }

    /**
   * Return the form group with patched data if not null
   * @param form - FormGroup
   *  @param data - Edh data
   *  
   */
    setEdhData(form: UntypedFormGroup, data) {
        form.get('dataIsEdh').setValue(data ? true : false);
        form.get('correspondenceName').setValue((data ? this.camelCase(data["basic-profile"]["entity-name"].value) : ''));
        form.get('correspondenceMobNo').setValue(data ? data.corppass[0]["mobile"].value : '');
        form.get('correspondenceEmail').setValue(data ? data.corppass[0]["email"].value : '');
        form.get('correspondenceBlock').setValue(data ? data.addresses[0]["block"].value : '');
        form.get('correspondenceStreet').setValue(data ? data.addresses[0]["street"].value : '');
        form.get('correspondenceLevelNo').setValue(data ? data.addresses[0]["floor"].value : '');
        form.get('correspondenceUnitNo').setValue(data ? data.addresses[0]["unit"].value : '');
        form.get('correspondenceBldgName').setValue(data ? data.addresses[0]["building"].value : '');
        form.get('correspondencePostalCode').setValue(data ? data.addresses[0]["postal"].value : '');
        form.get('correspondenceHanyuPinyin').setValue(data ? data.hanyupinyinname : '');
        form.get('correspondenceSex').setValue(data ? data.sex : '');
        form.get('correspondenceNationality').setValue(data ? data.nationality : '');
        form.get('correspondenceRegisteredAddress').setValue(data ? data.addresses[0]["block"].value + " " + data.addresses[0]["street"].value + " " + data.addresses[0]["floor"].value + "-" + data.addresses[0]["unit"].value + ' Singapore ' + data.addresses[0]["postal"].value : '');
        if (form.get('dataIsEdh').value) {
            form.disable();
        } else {
            form.enable();
            form.get('uen').disable();
            form.get('uin').disable();
        }
    }

    /**
        * Return the form group for mandatoryAttachments
        * @param form - FormGroup
        * @param isRequired - is control required
        */
    populateMandatoryAttachmentsFormGroup(fb: UntypedFormBuilder, x, isRequired: boolean) {
        return (
            fb.group({
                tendererBidDocFileId: [x ? x.tendererBidDocFileId : ''],
                mandatoryDocId: [x ? x.mandatoryDocId : ''],
                title: [x ? x.title : ''],
                description: [x ? x.description : '-'],
                docTypeCode: [x ? x.documentTypeCode : '-'],
                uploadedFile: [x && x.uploadedFile ? this.populateFileFormGroup(fb, x.uploadedFile, true) : null, isRequired ? Validators.required : []],
                noteToTenderer: [x ? x.noteToTenderer : '']
            })
        )
    }

    /**
        * Return the form group for mandatoryAttachments
        * @param form - FormGroup
        * @param isRequired - is control required
        */
    populateMandatoryQnAnsFormGroup(fb: UntypedFormBuilder, x, isRequired: boolean) {
        return (
            fb.group({
                tendererBidQnAnsId: [x ? x.tendererBidQnAnsId : ''],
                questionId: [x ? x.questionId : ''],
                questionOrdinal: [x ? x.questionOrdinal : ''],
                question: [x ? x.question : ''],
                answer: [x ? x.answer : '', isRequired ? Validators.required : []]
            })
        )
    }

    /**
        * Custom validator for FormArray minLength
        * @param min - number
   */
    minLengthArray(min: number) {
        return (c: AbstractControl): { [key: string]: any } => {
            if (c.value.length >= min)
                return null;
            return { 'minLengthArray': { valid: false } };
        }
    }

    camelCase(value: string) {
        if (value != null) {
            let modifiedValue = [];
            modifiedValue = value.toLowerCase().split(' ');
            for (let i = 0; i < modifiedValue.length; i++) {
                modifiedValue[i] = modifiedValue[i].charAt(0).toUpperCase() + modifiedValue[i].slice(1);
            }
            return modifiedValue.join(' ');
        }
        return null; // or return undefined;

    }

    //change to psm instead of psf
    calculateAreaSqftPrice(rent: number, size: number): string {
        if (isNaN(size))
            size = 0;
        let psm = rent > 0 ? rent / size : 0;
        return '$' + NumeralUtil.addComma(psm.toFixed(2).split(".")[0]) + "." + psm.toFixed(2).split(".")[1] + ' psm';
    }

    /**
    * Return formControlName has required validator
    * @param form - FormGroup
    * @param formControlName - FormControl name
    */
//     hasRequiredValidator(form: UntypedFormGroup, formControlName) {
//         const validator = form.get(formControlName) && form.get(formControlName).validator ? form.get(formControlName).validator({} as AbstractControl) : '';
//         if (validator && validator.required && !form.get(formControlName).disabled) {
//             return true;
//         }
//     }

//     /**
//     * Return dropdown has required validator
//     * @param form - FormGroup
//     * @param formGroupName - FormGroup name
//     */
//     hasRequiredValidatorFormGroup(form: UntypedFormGroup, formGroupName) {
//         const validator = form.get(formGroupName) && form.get(formGroupName).get('key').validator ? form.get(formGroupName).get('key').validator({} as AbstractControl) : '';
//         if (validator && validator.required && !form.get(formGroupName).disabled) {
//             return true;
//         }
//     }
 }

export function ValidateRichTextIsEmpty(control: AbstractControl) {
    if (control.value && control.value.replace("<p>", "").replace("</p>", "").replace("<br>", "") == "") {
        return { required: true };
    }

    return null;
}

export function ValidateRichTextMaxLengthVarChar(control: AbstractControl) {
    if (control.value && control.value.length > cnst.maxLengthStr) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateRichTextMaxLengthText(control: AbstractControl) {
    if (control.value && control.value.length > cnst.maxRichTextChar) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateDigitMaxLength(control: AbstractControl) {
    var value = control.value;
    if (value) {
        value = '' + value;
        value = value.replace(NumeralUtil.ALPHABET_CHAR, "");
        value = value.replace(NumeralUtil.SPECIAL_CHAR, "");
        value = value.replace(/[-,]/g, '');

        if (value.length > 16) {
            return { maxlength: true };
        }
    }
    return null;
}

export function ValidateHanyuPinyin(control: AbstractControl) {

    if (control.value && control.value.length > cnst.maxLengthStr) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateSex(control: AbstractControl) {

    if (control.value && control.value.length > cnst.maxLengthStr) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateNationality(control: AbstractControl) {

    if (control.value && control.value.length > cnst.maxLengthStr) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateRegAddress(control: AbstractControl) {

    if (control.value && control.value.length > cnst.maxLengthStr) {
        return { maxlength: true };
    }
    return null;
}

export function ValidateEmail(control: AbstractControl) {
    var value = control.value;
    if (value) {
        var local = value.split("@")[0];
        var atSign = value.indexOf("@");
        var domain = value.split("@")[1];

        if (atSign == -1) {
            return { invalidEmailFormat: true };
        } else if (local.length > cnst.SgdrmEmailFieldsSize.LOCAL || domain.length > cnst.SgdrmEmailFieldsSize.DOMAIN) {
            return { invalidEmailLength: true };
        } else if (domain != null) {
            var domainCheck = domain.split(".");
            if (!domainCheck[1]) {
                return { invalidEmailFormat: true };
            }
        } else {
            return null
        }

    }
    return null;
}

export function ValidateGender(control: AbstractControl) {
    var value = control.value;

    if (value) {
        if (control.value && control.value.length > cnst.maxLengthStr) {
            return { maxlength: true };
        }
        if (value.toUpperCase() == "MALE" || value.toUpperCase() == "FEMALE") {

            return null;
        } else {
            return { invalidGenderFormat: true, required: true };
        }
    }
    return null;
}

export function MinSelectedCheckboxes(minLength) {
    const validator: ValidatorFn = (formArray: UntypedFormArray) => {
        const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);
        return totalSelected >= minLength ? null : { 'required': true };
    };

    return validator;
}

export function ValidateCheckboxesToBeChecked(minRequired = 1): ValidatorFn {
    return function validate(formGroup: UntypedFormGroup) {
        let checked = 0;

        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.controls[key];

            if (control.value === true) {
                checked++;
            }
        });

        if (checked < minRequired) {
            return {
                requireCheckboxesToBeChecked: true,
            };
        }

        return null;
    };
}
