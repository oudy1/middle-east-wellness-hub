function setupSheetsAndHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Sheet and header definitions
  const sheets = [
    {
      name: 'postOpportunity',
      headers: [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Newsletter', 'Phone', 'Institution', 'Project Title', 'Project Description', 'Preferred Background', 'Deadline', 'Is Paid', 'Study Website', 'File URL'
      ]
    },
    {
      name: 'physicianApplication',
      headers: [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Sign Up For News', 'Phone', 'Specialty', 'Hospital/Clinic Affiliation', 'Years of Experience', 'Languages Spoken', 'Cultural Background', 'Availability', 'Message'
      ]
    },
    {
      name: 'joinUs',
      headers: [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Phone', 'Profession', 'Experience', 'Interests', 'Motivation', 'Availability', 'Skills', 'Languages Spoken', 'Previous Volunteer', 'References'
      ]
    }
  ];

  sheets.forEach(({ name, headers }) => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    } else {
      sheet.clear();
    }
    sheet.appendRow(headers);
  });
}
function doPost(e) {
  const folderId = '1-k_YhId7z_d39M6vMh4xaQnt6-8vGTjz'; // replace with your Drive folder ID
  const folder = DriveApp.getFolderById(folderId);

  // Ensure `e` has the correct structure
  const data = JSON.parse(e.postData.contents);

  // If a file was uploaded
  const ng = data?.fileData ? Utilities.base64Decode(data.fileData) : null;
  const fileName = data?.fileName || "Unnamed";
  const contentType = data?.fileType || "application/octet-stream";
  const blob = ng ? Utilities.newBlob(ng, contentType, fileName) : null;

  let fileUrl = '';
  if (blob) {
    const file = folder.createFile(blob);
    file.setName(fileName); // Set the file name
    fileUrl = file.getUrl();
  }

  // Determine which form was submitted and append to the correct sheet
  let sheetName = data.form || '';
  if (!sheetName) {
    // Try to infer from known fields
    if (data.specialty && data.hospitalAffiliation) {
      sheetName = 'physicianApplication';
    } else if (data.motivation && Array.isArray(data.interests)) {
      sheetName = 'joinUs';
    } else {
      sheetName = 'postOpportunity';
    }
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (sheetName === 'postOpportunity') {
    sheet.appendRow([
      new Date(),
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.newsletter || '',
      data?.phone || '',
      data?.institution || '',
      data?.projectTitle || '',
      data?.projectDescription || '',
      data?.preferredBackground || '',
      data?.deadline || '',
      data?.isPaid || '',
      data?.studyWebsite || '',
      fileUrl
    ]);
  } else if (sheetName === 'physicianApplication') {
    sheet.appendRow([
      new Date(),
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.signUpForNews || '',
      data?.phone || '',
      data?.specialty || '',
      data?.hospitalAffiliation || '',
      data?.experience || '',
      data?.languagesSpoken || '',
      data?.culturalBackground || '',
      data?.availability || '',
      data?.message || ''
    ]);
  } else if (sheetName === 'joinUs') {
    sheet.appendRow([
      new Date(),
      data?.firstName || '',
      data?.lastName || '',
      data?.email || '',
      data?.phone || '',
      data?.profession || '',
      data?.experience || '',
      (Array.isArray(data?.interests) ? data.interests.join(', ') : ''),
      data?.motivation || '',
      data?.availability || '',
      data?.skills || '',
      data?.languagesSpoken || '',
      data?.previousVolunteer || '',
      data?.references || ''
    ]);
  }

  // Return the result
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success', fileUrl }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPostTest() {
  const e = {
    postData: {
      contents: JSON.stringify({
        form: "postOpportunity",
        firstName: "jnik",
        lastName: "hj,mnbg",
        email: "w@w.xcom",
        newsletter: false,
        phone: "",
        institution: ",oi",
        projectTitle: "o.j,l",
        projectDescription: ".olhj,",
        preferredBackground: "",
        deadline: "2122-12-12",
        isPaid: "no",
        studyWebsite: "",
        fileData: "cGFja2FnZSBtYWluCgpmdW5jIG1haW4oKSB7CglwcmludGxuKCJyZyIpCn0KCg==", // Base64 encoded data for file content
        fileName: "main.go",
        fileType: "text/x-go"
      })
    }
  };

  return doPost(e);  // Now calling the doPost function with proper object structure
}



