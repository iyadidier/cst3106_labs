# Hospital Triage App Design Documentation

## Design Overview
The **Hospital Triage App** is designed to streamline the emergency room process by managing patient injury reports and prioritizing them for administrative review. The design emphasizes user accessibility, simplicity, and speed, providing a clear interface for both patients and administrative staff to quickly interact with the system.

---

## Fonts

### Fonts Used:
- **Headings**: `Helvetica Neue`, sans-serif
- **Body Text**: `Georgia`, serif

### Font Weights:
- **Headings**: Bold (700)
- **Body Text**: Regular (400)

### Rationale:
- **Helvetica Neue** is used for headings and buttons for its clean, modern, and easy-to-read nature on digital screens, ensuring readability and prominence in UI elements.
- **Georgia** is chosen for body text to offer a serif-based font that contrasts with headings, making longer sections of text easy to read and reducing eye strain.

---

## Colour Palette

### User Interface Colors:
- **Primary Color (Buttons & Headings)**: `#2E8B57` (Soothing Green)
  - Used for primary call-to-action buttons and headings to instill a calming effect on patients and promote a positive user experience.
  
- **Background Color**: `#F5F5DC` (Light Beige)
  - A neutral background color that reduces visual strain and maintains a calm, neutral atmosphere on the user interface.

### Admin Interface Colors:
- **Primary Color (Text & Background)**: `#708090` (Slate Grey)
  - Used for the admin section to convey seriousness and professionalism, making the interface feel authoritative.
  
- **Accent Color (Alerts & Critical Action)**: `#FFBF00` (Amber)
  - Draws attention to critical alerts and urgent tasks that require immediate action from the admin.

### Visual Palette:
- ![#2E8B57](https://via.placeholder.com/15/2E8B57/000000?text=+) **Soothing Green**: `#2E8B57`
- ![#F5F5DC](https://via.placeholder.com/15/F5F5DC/000000?text=+) **Light Beige**: `#F5F5DC`
- ![#708090](https://via.placeholder.com/15/708090/000000?text=+) **Slate Grey**: `#708090`
- ![#FFBF00](https://via.placeholder.com/15/FFBF00/000000?text=+) **Amber**: `#FFBF00`

### Rationale:
- The **Soothing Green** promotes a calming environment, especially in a high-stress setting like the emergency room.
- **Light Beige** creates a subtle and unobtrusive background to allow users to focus on the task at hand without distraction.
- The **Slate Grey** in the admin interface provides a professional and authoritative feel, suitable for administrative tasks.
- **Amber** is used for alert messages to make critical information stand out immediately, prompting immediate attention.

---

## App Components

### Titles:
- **User Page Title**: "Hospital Triage - User"
- **Admin Page Title**: "Hospital Triage - Admin"
#### Design:
- Font: `Helvetica Neue`, Bold (700)  
- Size: 36px  
- Alignment: Centered  

### Buttons:
- **User Submit Button**: Soothing Green (`#2E8B57`) with white text.
- **Admin Action Button**: Amber (`#FFBF00`) with white text.

#### Design:
- Shape: Rounded corners (8px radius)
- Size: 44px height, 200px width
- Font: `Georgia`, Regular (400)
- Hover Effect: Slight shadow and darker color tone for visual feedback.

### Input Fields:
- **Border Color**: Light Beige (`#F5F5DC`), turns Soothing Green (`#2E8B57`) on focus.
- **Font**: `Georgia`, Regular (400)

### Questionnaire (User Page):
- A form that collects information about the patient's type of injury and pain level, with options presented clearly and intuitively.
- **Fields**:
  - Injury Type (select box)
  - Pain Level (numeric input)

### Admin Summary (Admin Page):
- Displays a summary of patients waiting for treatment, including information about the urgency and criticality of each case.
- **Fields**:
  - Patient Summary (e.g., Pending Cases, Critical Cases)
  - Alerts for urgent attention

---

## Layout and Navigation

### Wireframe:
A responsive grid-based layout is used to ensure compatibility with multiple devices. The design is mobile-first, focusing on mobile users and adapting for desktop use.

- **User Page**: A simple questionnaire layout, followed by a submit button.
- **Admin Page**: A summary of patients and alerts, designed for quick administrative actions.

### Navigation:
- **User Page Navigation**: The user submits their injury report through a single form. Once completed, they are notified that their information has been submitted.
- **Admin Page Navigation**: Admins can view the list of patient cases, prioritize them based on urgency, and take action if necessary.

---

## Consistency

- **Visual Consistency**: The use of consistent color schemes across both pages ensures a cohesive experience. User-facing elements like buttons and input fields are styled similarly, promoting predictability.
- **Functional Consistency**: The interaction design is standardized throughout the app. For instance, the buttons across both pages have the same layout and design, ensuring that users and admins experience similar interactions, enhancing usability.

### Achieving Consistency:
- The consistent use of fonts (`Helvetica Neue` for headings, `Georgia` for body text) helps maintain a clear typographic hierarchy.
- The **Soothing Green** and **Amber** accent colors provide clear visual cues across both user and admin pages.
- The input fields, buttons, and other interactive elements are styled similarly to ensure ease of use and familiarity.

---

## Component Integration

### Integration of Components:
- The **questionnaire** for users and the **summary dashboard** for admins are designed to work seamlessly with the underlying functionality, ensuring that users can easily submit their injury details and admins can quickly assess and manage incoming reports.
- The consistent design ensures that both the user and admin experiences are intuitive, quick, and functional.

---

## Functionality

The **Hospital Triage App** is designed to facilitate the efficient submission and management of patient reports:
- **For Users**: They can submit their injury type and pain level through an easy-to-use form, and submit it for review.
- **For Admins**: They can view a summary of patient cases, prioritize them based on urgency, and take appropriate actions based on the criticality of the case.

---

## Conclusion

This design system document outlines the visual and functional components of the **Hospital Triage App**. The goal of the app is to create an easy-to-navigate, intuitive platform for both users and administrators, ensuring that the emergency triage process is streamlined and efficient.
