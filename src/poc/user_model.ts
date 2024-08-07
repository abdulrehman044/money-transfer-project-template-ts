interface Permissions {
    add_new_hr_page_item: boolean;
    show_cto_voucher_requests: boolean;
    show_manage_page: boolean;
    allow_revert: boolean;
    show_projects_page: boolean;
    allow_edit_project: boolean;
    allow_add_new_employee: boolean;
    allow_add_project: boolean;
    add_news_from_hr_page: boolean;
    show_leaves: boolean;
    allow_edit_permissions: boolean;
    allow_edit_employee: boolean;
}

interface LineManager {
    uid: string;
    profilePicture: string;
    name: string;
    department: string;
    title: string;
    email: string;
}

interface IncrementHistory {
    _seconds: number;
    _nanoseconds: number;
}

interface Leaves {
    medical: number;
    paternity: number;
    wedding: number;
    bdo: number;
    cto: number;
    pto: number;
}

export class User {
    education: string | null;
    isEmailVerified: boolean;
    uid: string;
    permissions: Permissions;
    activeApplication: string | null;
    email: string;
    leavingDate: string | null;
    lastOffDate: string | null;
    creationDate: string;
    activeApplicationType: string | null;
    function: string;
    isAfk: boolean;
    lineManager: LineManager;
    address: string;
    gender: string;
    employmentType: string;
    joiningDate: string;
    lineManagerId: string;
    title: string;
    hasPendingLeaveApplication: boolean;
    currentLocation: string;
    profilePicture: string;
    isWfh: boolean;
    phone: string;
    dob: string;
    name: string;
    department: string;
    isProfileSetup: boolean;
    userType: number;
    level: string;
    subLevel: string;
    promotionHistory: any[];
    incrementHistory: IncrementHistory[];
    IAHistory: IncrementHistory[];
    leaves: Leaves;

    constructor(data: any) {
        this.education = data.education;
        this.isEmailVerified = data.isEmailVerified;
        this.uid = data.uid;
        this.permissions = data.permissions;
        this.activeApplication = data.activeApplication;
        this.email = data.email;
        this.leavingDate = data.leavingDate;
        this.lastOffDate = data.lastOffDate;
        this.creationDate = data.creationDate;
        this.activeApplicationType = data.activeApplicationType;
        this.function = data.function;
        this.isAfk = data.isAfk;
        this.lineManager = data.lineManager;
        this.address = data.address;
        this.gender = data.gender;
        this.employmentType = data.employmentType;
        this.joiningDate = data.joiningDate;
        this.lineManagerId = data.lineManagerId;
        this.title = data.title;
        this.hasPendingLeaveApplication = data.hasPendingLeaveApplication;
        this.currentLocation = data.currentLocation;
        this.profilePicture = data.profilePicture;
        this.isWfh = data.isWfh;
        this.phone = data.phone;
        this.dob = data.dob;
        this.name = data.name;
        this.department = data.department;
        this.isProfileSetup = data.isProfileSetup;
        this.userType = data.userType;
        this.level = data.level;
        this.subLevel = data.subLevel;
        this.promotionHistory = data.promotionHistory;
        this.incrementHistory = data.incrementHistory;
        this.IAHistory = data.IAHistory;
        this.leaves = data.leaves;
    }

    static fromJSON(data: any): User {
        return new User(data);
    }

    toJSON(): any {
        return {
            education: this.education,
            isEmailVerified: this.isEmailVerified,
            uid: this.uid,
            permissions: this.permissions,
            activeApplication: this.activeApplication,
            email: this.email,
            leavingDate: this.leavingDate,
            lastOffDate: this.lastOffDate,
            creationDate: this.creationDate,
            activeApplicationType: this.activeApplicationType,
            function: this.function,
            isAfk: this.isAfk,
            lineManager: this.lineManager,
            address: this.address,
            gender: this.gender,
            employmentType: this.employmentType,
            joiningDate: this.joiningDate,
            lineManagerId: this.lineManagerId,
            title: this.title,
            hasPendingLeaveApplication: this.hasPendingLeaveApplication,
            currentLocation: this.currentLocation,
            profilePicture: this.profilePicture,
            isWfh: this.isWfh,
            phone: this.phone,
            dob: this.dob,
            name: this.name,
            department: this.department,
            isProfileSetup: this.isProfileSetup,
            userType: this.userType,
            level: this.level,
            subLevel: this.subLevel,
            promotionHistory: this.promotionHistory,
            incrementHistory: this.incrementHistory,
            IAHistory: this.IAHistory,
            leaves: this.leaves
        };
    }
}

// // Example usage:
// const userData = {
//     id: '3lYQLGudEWRrEM22DfGWCOgUKC93',
//     education: null,
//     isEmailVerified: true,
//     uid: '3lYQLGudEWRrEM22DfGWCOgUKC93',
//     permissions: {
//         add_new_hr_page_item: false,
//         show_cto_voucher_requests: false,
//         show_manage_page: false,
//         allow_revert: false,
//         show_projects_page: false,
//         allow_edit_project: false,
//         allow_add_new_employee: false,
//         allow_add_project: false,
//         add_news_from_hr_page: false,
//         show_leaves: false,
//         allow_edit_permissions: false,
//         allow_edit_employee: false
//     },
//     activeApplication: null,
//     email: 'umair.atiq@xgrid.co',
//     leavingDate: null,
//     lastOffDate: null,
//     creationDate: '2023-11-30T12:22:10.204Z',
//     activeApplicationType: null,
//     function: 'Apps',
//     isAfk: false,
//     lineManager: {
//         uid: 'W0KEGOFgX8ZzDBVqrJ7Zf0haCLu1',
//         profilePicture: 'https://firebasestorage.googleapis.com/v0/b/xpulse-dev.appspot.com/o/profile_pictures%2FW0KEGOFgX8ZzDBVqrJ7Zf0haCLu1.jpg?alt=media&token=c757fe63-1743-47dd-9acf-3882f2940abb',
//         name: 'Abdul Rehman',
//         department: 'CLOUD NATIVE',
//         title: 'SHO',
//         email: 'mrehman@xgrid.co'
//     },
//     address: '',
//     gender: 'Male',
//     employmentType: 'Permanent',
//     joiningDate: '2023-11-30T00:00:00.000',
//     lineManagerId: 'W0KEGOFgX8ZzDBVqrJ7Zf0haCLu1',
//     title: 'TL',
//     hasPendingLeaveApplication: false,
//     currentLocation: 'Islamabad',
//     profilePicture: '',
//     isWfh: false,
//     phone: '',
//     dob: '2023-11-07T00:00:00.000',
//     name: 'Umair Atiq',
//     department: 'CLOUD NATIVE',
//     isProfileSetup: true,
//     userType: 2,
//     level: 'L5',
//     subLevel: 'L5.1',
//     promotionHistory: [],
//     incrementHistory: [
//         { _seconds: 1688151600, _nanoseconds: 0 },
//         { _seconds: 1704049200, _nanoseconds: 0 }
//     ],
//     IAHistory: [{ _seconds: 1704067200, _nanoseconds: 0 }],
//     leaves: { medical: 5, paternity: 15, wedding: 15, bdo: 1, cto: 0, pto: 34.5 }
// };

// // Create a User instance from JSON data
// const user = User.fromJSON(userData);

// // Convert the User instance back to JSON
// const userJson = user.toJSON();
// console.log(userJson);
