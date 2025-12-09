
import { enumToDropdownArray } from '../HelperFunctions/index.tsx';

export const contractorsInvolved = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];



// Injury-related constants using EHSNavigator enum values
export const DOCUMENT_LIBRARY = [
  { label: 'All', value: 'All' },
  { label: 'My Document', value: 'My Document' },
  { label: 'Organization', value: 'Organization' },
];
export const DOCUMENT_LIBRARY_TYPES = [
  { label: 'My Document', value: 'My Document' },
  { label: 'Organization', value: 'Organization' },
];

export const INJURY_CLASSIFICATIONS = [
  { label: 'Hospitalized', value: 'Hospitalized' },
  { label: 'Lost Time Injury', value: 'Lost Time Injury' },
  { label: 'Non–Lost Time Injury', value: 'Non–Lost Time Injury' },
  { label: 'Other', value: 'Other' },
];

export const INJURY_TYPE_OF_LOSS = [
  { label: 'Death', value: 'Death' },
  { label: 'Loss of consciousness', value: 'Loss of consciousness' },
  { label: 'Days away from work', value: 'Days away from work' },
  {
    label: 'Restricted work activity or job transfer',
    value: 'Restricted work activity or job transfer',
  },
  {
    label: 'Medical treatment beyond first aid',
    value: 'Medical treatment beyond first aid',
  },
  {
    label: 'None of the above',
    value: 'None of the above',
  },
];

export const INJURY_ILLNESS_CLASSIFICATIONS = [
  { label: 'Skin Disorder', value: 'Skin Disorder' },
  { label: 'Respiratory Condition', value: 'Respiratory Condition' },
  { label: 'Poisoning', value: 'Poisoning' },
  { label: 'Hearing Loss', value: 'Hearing Loss' },
  { label: 'Other Illness', value: 'Other Illness' },
];

export const MY_REPORTED_INCIDENTS_DROPDOWN = [
  { id: 1, title: 'All statuses' },
  { id: 2, title: 'All departments' },
  { id: 3, title: 'All types' },
  { id: 4, title: 'All severities' },
];

export const DUE_DAYS = [
  { label: 'Due in 1 days', value: '1' },
  { label: 'Due in 2 days', value: '2' },
  { label: 'Due in 3 days', value: '3' },
  { label: 'Due in 5 days', value: '5' },
  { label: 'Due in 7 days', value: '7' },
  { label: 'Due in 10 days', value: '10' },
  { label: 'Due in 14 days', value: '14' },
];

export const allowedExtensions = [
  'png',
  'jpg',
  'jpeg',
  'mp4',
  'gif',
  'pdf',
  'doc',
  'docx',
];

export const GETTING_START = [
  {
    id: 1,
    restrict: ['employee', 'manager', 'admin'],
    question: 'What happens after an organization is registered?',
    answer:
      'The registered user becomes the Owner. You get a 7-day free trial with access to all features and can onboard 10 users.',
  },
  {
    id: 2,
    restrict: ['employee', 'manager', 'admin'],
    question: 'What happens after an organization signs up?',
    answer:
      ' After an organization signs up, the user who completes the registration is assigned the Owner role. The Owner can start configuring departments, adding Admins, and setting up the initial team. Admins can then add Managers and Employees.',
  },
];

export const USER_MANAGEMENT = [
  {
    id: 3,
    restrict: ['employee', 'manager'],
    question: 'How do I add users to the platform?',
    answer:
      'Users can be added via the User Management section, which is accessible by both the Owner and Admins.',
  },
  {
    id: 4,
    restrict: ['employee', 'manager'],
    question: 'Do I need to set anything up before adding users?',
    answer:
      'Yes. Roles can be updated anytime via User Management > User Roles.',
  },
  {
    id: 5,
    restrict: ['employee', 'manager'],
    question: 'Can I change a user\u2019s role after they\u2019ve been added?',
    answer:
      'Yes. Roles can be updated anytime via User Management > User Roles.',
  },
  {
    id: 6,
    restrict: ['employee', 'manager'],
    question: 'Who can manage users and roles?',
    answer:
      'The Owner has full control over all users and roles. Admins can create, update, or perform delete operations on users and can also update their roles and department assignments.',
  },
];

export const INC_AND_COR_ACTION = [
  {
    id: 7,
    restrict: [],
    question: 'Who can report incidents?',
    answer:
      'Any user on the platform can report an incident via Incidents > Report Incident menu.',
  },
  {
    id: 8,
    restrict: [],
    question: 'Can I save an incident report as a draft?',
    answer: 'Yes. Incident reports can be saved as drafts and submitted later.',
  },
  {
    id: 9,
    restrict: [],
    question: 'Who gets notified when an incident is reported?',
    answer:
      'The Owner, Admins, and Managers receive an email & Push notification whenever a new incident is submitted.',
  },
  {
    id: 10,
    restrict: [],
    question: 'What happens after an incident is submitted?',
    answer:
      'Management will review the incident. They can either mark it as Closed or assign a Corrective Action to a team or individual.',
  },
  {
    id: 11,
    restrict: [],
    question: 'How do I track corrective actions assigned to me?',
    answer:
      'Go to Corrective Actions > Assigned to Me to view, manage, mark for review, or request extensions.',
  },
  {
    id: 12,
    restrict: [],
    question: 'Who gets notified when a corrective action is assigned?',
    answer:
      'The assigned team or individual receives an email with full details of the corrective action.',
  },
  {
    id: 13,
    restrict: [],
    question: 'What can I do if I\u2019m assigned a corrective action?',
    answer:
      'You can mark it for review, request an extension, or pull it back if needed.',
  },
  {
    id: 14,
    restrict: [],
    question: 'Can I add supporting notes or files to a corrective action?',
    answer:
      'Yes, you can add notes and assets (i.e., image, video, and document) for a corrective action mark for review or due date extension requests.',
  },
];

export const COR_ACTION_MANAGEMENT = [
  {
    id: 15,
    restrict: ['employee'],
    question: 'Can I save a corrective action without assigning it?',
    answer:
      'Yes, corrective actions can be saved as drafts before being assigned.',
  },
  {
    id: 16,
    restrict: ['employee'],
    question: 'Who can edit or assign a corrective action?',
    answer:
      'The Owner, Admins, and Managers can edit any corrective action or issue a new one.',
  },
  {
    id: 17,
    restrict: ['employee'],
    question: 'Can multiple users be assigned to a corrective action?',
    answer:
      'Yes. One will be the Lead Assignee, responsible for sending it for review or requesting a due date extension.',
  },
  {
    id: 18,
    restrict: ['employee'],
    question: 'Who can approve or reject a corrective action?',
    answer:
      'Only the user who assigned it can approve, reject, or respond to extension requests.',
  },
];

export const INJURIES = [
  {
    id: 19,
    restrict: ['employee'],
    question: 'Who can access the Investigation Tool?',
    answer: 'The feature is available to Owner, Admin, and Manager roles',
  },
  {
    id: 20,
    restrict: ['employee'],
    question: 'How are injuries tracked in the system?',
    answer:
      'When an incident is reported under Injury/Illness type, it automatically appears in the Injuries section.',
  },
  {
    id: 21,
    restrict: ['employee'],
    question: 'Can I upload investigation reports?',
    answer:
      'Yes, you can upload PDF/DOC reports. If uploaded, only OSHA-required fields will remain in later steps.',
  },
  {
    id: 22,
    restrict: ['employee'],
    question: 'What investigation methods are supported?',
    answer:
      'The tool supports:\n• General Injury Details\n• Personal Formatted Investigation Report\n• Guided 5 Whys questions; a few are required in the OSHA submission\n• Custom organizational questions (set in My Account > Custom Questions)\n• Additional custom, incident-specific questions\n• Root Cause Analysis summary',
  },
  {
    id: 23,
    restrict: ['employee'],
    question: 'Can investigations be edited after submission?',
    answer:
      'Yes, investigations can be edited. Management is also notified by email whenever an investigation is submitted.',
  },
  {
    id: 24,
    restrict: ['employee'],
    question: 'Does this integrate with OSHA reporting?',
    answer:
      'Yes, investigations and records are compatible and will populate the OSHA module.',
  },
  {
    id: 25,
    restrict: ['employee'],
    question: 'Are injury statistics available?',
    answer:
      'Yes, the statistics dashboard shows TRIR, time since last injury, types of loss, body parts affected, classifications, and injuries by department.',
  },
];
export const DOCUMENT_LIBRARY_FAQ = [
  {
    id: 26,
    restrict: [],
    question: 'What file types can I upload?',
    answer:
      'You can upload most common document types such as .pdf, .doc, and .docx.',
  },
  {
    id: 27,
    restrict: [],
    question: 'Can I see documents uploaded by other users?',
    answer:
      'Yes, all users can access organizational documents. Personal documents are visible only to their uploader.',
  },
  {
    id: 28,
    restrict: [],
    question: 'How does the search enhancement work?',
    answer:
      'The system now analyzes document content to return more accurate and relevant results — not just by file title or tags.',
  },
  {
    id: 29,
    restrict: [],
    question: 'Who can delete documents?',
    answer:
      'Users can delete their own documents. Admins can delete any document if required.',
  },
];

export const FAQS_ITEMS = [
  ...GETTING_START,
  ...USER_MANAGEMENT,
  ...INC_AND_COR_ACTION,
  ...COR_ACTION_MANAGEMENT,
  ...INJURIES,
  ...DOCUMENT_LIBRARY_FAQ,
];

export const USER_GUIDE_CONTENT = [
  {
    label: '🔐 1. Getting Started',
    list: [
      'After registration, the user becomes the **Owner** of the organization.',
      'Your organization starts with a **7-day free trial**, full access to all features, and can onboard **up to 10 users**.',
      'During signup, you can either **choose a subscription plan** or **start with the free trial**.',
    ],
  },
  {
    label: '👥 2. User Management',
    list: [
      'Available to **Owner and Admin** roles only.',
      'Start by creating **Departments** via **User Management > Departments**.',
      'Add users (Admins, Managers, Employees) and assign roles.',
      'Roles can be updated anytime from **User Management > User Roles**.',
      '**Admins** can add, update, and delete the Managers and Employees, as well as manage roles.',
      '**2.1 Bulk User Creation**',
      [
        'Available to Owner and Admins via **User Management > Bulk Upload**.',
        '**Step 1 – Upload**: Download the sample XLSX, fill in user details, and upload XLSX/CSV file.',
        '**Step 2 – Validation & Editing**: Review uploaded records in an editable table. Correct errors, add/remove rows, and pass all validation checks before proceeding.',
        '**Step 3 – Final Review**: Review validated records before submission.',
        '**Task Review**:',
        [
          'Track bulk upload progress and view task history (last 2 months).',
          'Drill down into successful and failed records with error reasons.',
        ],
        '**Notifications**:',
        [
          'Initiating Admin receives completion email.',
          'The Owner of the organization will also receive an email summarizing how many employees, managers, and admins were added during the process.',
        ],
      ],
    ],
  },
  {
    label: '📄 3. Incident Reporting',
    list: [
      'Any user can report incidents via **Incidents > Report Incident**.',
      'Incidents can be saved as **drafts** before submission.',
      'On submission, the **Owner, Admins, and Managers** are notified via Email & Push.',
    ],
  },
  {
    label: '🛠️ 4. Incident Review & Corrective Actions',
    list: [
      'Accessible to **Owner, Admins, and Managers**.',
      'View all organisation incidents via **Manager Review > Incident Review**.',
      '**Owner, Admins, and Managers** can:',
      [
        'Assign **Corrective Actions** to individuals or teams.',
        'Save corrective actions as drafts.',
      ],
      'For multi-assignee actions:',
      [
        'A **Lead Assignee** is required and is responsible for:',
        ['Sending the action for review.', 'Requesting due date extension.'],
      ],
    ],
  },
  {
    label: '✅ 5. Managing Corrective Actions',
    list: [
      '**Assigned to Me**: View corrective actions assigned to you under **Corrective Actions > Assigned to Me**. Anyone can be assigned a corrective action.',
      [
        'You can mark for review, pull back, or request an extension.',
        'Add notes or assets (images or documents) to support your submission.',
      ],
      '**Assigned by Me**: See actions you\u2019ve assigned via **Manager Review > Assigned Corrective Action**. Accessible to **Owner, Admins, and Managers**.',
      ['You can approve/reject the review or handle extension requests.'],
      '**All Corrective Actions**: View across the org via **Corrective Actions > All Corrective Actions**.',
      [
        'Anyone (Owner, Admins, and Managers) can edit; only the assigner can approve, reject, or manage extension requests.',
      ],
    ],
  },
  // {
  //   label: '🩺 6. Injuries & Investigation Tool',
  //   list: [
  //     'Accessible to **Owner, Admins, and Managers** via **Injuries** in the sidebar.',
  //     '**Automatic Tracking**:',
  //     [
  //       'Any reported incident under Injury/Illness automatically appears in this section.',
  //     ],
  //     '**Investigation Workflow**:',
  //     [
  //       '**Default Information** – Capture key details (injury type, type of loss, affected body parts, classification, date/time, location). Optional report upload.',
  //       '**5 Whys Questions** – Guided root cause questions, including OSHA-related fields.',
  //       '**Organizational Questions** – Custom questions defined in **My Account > Custom Questions**.',
  //       '**Custom Questions & Root Cause** – Add incident-specific questions and provide a root cause analysis summary.',
  //       '**Review** – Final categorized review of all inputs before submission.',
  //     ],
  //     '**Additional Features**:',
  //     [
  //       'Investigations can be edited after submission.',
  //       'Management receives email notifications when investigations are submitted.',
  //       'History tracking is maintained.',
  //       'Data can be searched, filtered, and exported (CSV/XLSX).',
  //       'Compatible with OSHA reporting (records populate OSHA module).',
  //     ],
  //   ],
  // },
  {
    label: '🩺 6. Injuries & Investigation Tool',
    list: [
      'Accessible to **Owner, Admins, and Managers** via **Injuries** in the sidebar.',
      '**Automatic Tracking**:',
      [
        'Any reported incident under Injury/Illness automatically appears in this section.',
      ],
      '**Investigation Workflow**:',
      [
        '**Default Information** – Capture key details (injury type, type of loss, affected body parts, classification, date/time, location). Optional report upload.',
        '**5 Whys Questions** – Guided root cause questions, including OSHA-related fields.',
        '**Organizational Questions** – Custom questions defined in **My Account > Custom Questions**.',
        '**Custom Questions & Root Cause** – Add incident-specific questions and provide a root cause analysis summary.',
        '**Review** – Final categorized review of all inputs before submission.',
      ],
      '**Additional Features**:',
      [
        'Investigations can be edited after submission.',
        'Management receives email notifications when investigations are submitted.',
        'History tracking is maintained.',
        'Data can be searched, filtered, and exported (CSV/XLSX).',
        'Compatible with OSHA reporting (records populate OSHA module).',
      ],
    ],
  },
  {
    label: '🗂️ 7. Document Library',
    list: [
      'The Document Library allows users to securely upload, access, search, and manage organizational and personal documents in one centralized location.',
      [
        '**Upload Documents**: Upload Word, PDF, or other supported file formats. ',
        '**Access Control**: View all documents available in your organization, including personal uploads.',
        '**Search Functionality**: Search by title, tags, or author.',
        '**Content-Based Search**: The system now parses document content to provide more relevant search results.',
        '**Download/Delete**: Users can download or delete their documents as needed.',
      ],
    ],
  },
  {
    label: '🏥 8. OSHA Reporting',
    list: [
      'The OSHA Reporting module enables organization owners and admins to submit OSHA Forms 300 and 300A directly via API, ensuring compliance with OSHA injury and illness recordkeeping requirements.',
      '⚠️ **Note**: OSHA electronic reporting is available only between January 2 and March 2 each year.',
      '**Key Features**',
      [
        '**Reporting Window**: Submissions are accepted only from Jan 2 – Mar 2.',
        '**Report Incidents**: Submit Injury/Illness incidents via the OSHA Reporting workflow.',
        '**Automated Form Population**: Form 300 and 300A fields are dynamically populated from completed investigations.',
        '**Establishment Creation**: Required establishment details are automatically created before submission.',
        '**Manual Inputs**: Add annual average employee count and total hours worked for the reporting year.',
        '**View and Manage Records**: Review record details and linked investigations directly from the OSHA 300 screen.',
        '**Exclusion Control**: Exclude records from submission by flagging them.',
        '**Submission Logs**: View all submissions in the OSHA Logs screen, including success/failure status, with options to resubmit failed submissions.',
        '**Search, Filter, and Export**: Quickly locate and manage logs using built-in tools.',
      ],
      '**How to Use**',
      [
        'Navigate to **OSHA Reporting → Form 300 / Form 300A**.',
        'Review auto-populated data from completed investigations.',
        'Complete any required manual fields (e.g., employee averages, total hours).',
        'Submit the form to OSHA via API (available only Jan 2–Mar 2).',
        'View submission status under **OSHA Logs**.',
        'If a submission fails, use the **Resubmit** option.',
      ],
    ],
  },
  {
    label: '🕓 9. History Tracking',
    list: [
      'Every incident, corrective action, and investigation includes a history of actions performed on the details page.',
    ],
    // label: '🕓 7. History Tracking',
    // list: [
    //   'Every incident and corrective action includes a history of actions performed on the details page.',
    // ],
  },
  {
    label: '📧 10. Email & Push Notifications',
    // label: '📧 8. Email & Push Notifications',
    summary: 'Email & Push notifications are sent when:',
    list: [
      'An incident is reported.',
      'An incident is closed, reopened, or withdrawn.',
      'A corrective action is assigned or edited.',
      'A corrective action sent for review or extension is requested/approved/rejected.',
      'A corrective action is marked for review, pulled back, or rejected.',
      'When an Admin starts a bulk user creation process, they receive an email once it is completed. This email includes details about the onboarded users.',
      'The Owner of the organization also receives an email summarizing the number of employees, managers, and admins added during the bulk upload process.',
      'When an investigation is created or edited, the respective management receives an email notification upon submission.'

    ],
  },
  // {
  //   label: '📊 10. Statistics Dashboard',
  //   list: [
  //     'Accessible to **Owner, Admins, and Managers**, the dashboard offers insights into trends and activity.',
  //     '**Overview**',
  //     [
  //       'Total Incidents Reported',
  //       'Active Corrective Actions',
  //       'Most Reported Department',
  //       'All-Time Incidents Resolved',
  //     ],
  //     '**Incident Trends**',
  //     [
  //       'Time Since Last Incident',
  //       'Average Time Between Reports',
  //       'Incident Reported vs Resolved (This Month, Last Month, Second Last Month)',
  //     ],
  //     '**Detailed Insights** (with filters)',
  //     [
  //       'Monthly incidents (reported/resolved)',
  //       'Incidents by Department, Severity, and Type',
  //       'Corrective Action stats (overall, by department, avg. closure time)',
  //     ],
  //     '**Corrective Action Breakdown**',
  //     ['Active and Due Corrective Actions'],
  //   ],
  // },
];
