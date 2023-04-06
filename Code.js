function myFunction() {
  let serviceAccountIds;
  let projects = JSON.parse(UrlFetchApp.fetch("https://cloudresourcemanager.googleapis.com/v1/projects", {
    "headers": {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken()
    }
  }).getContentText());
  projects.projects.forEach((project) => {
    serviceAccountIds = JSON.parse(UrlFetchApp.fetch(`https://iam.googleapis.com/v1/projects/${project.projectId}/serviceAccounts`, {
      "headers": {
        "Authorization": "Bearer " + ScriptApp.getOAuthToken()
      }
    }).getContentText());
    if (Object.keys(serviceAccountIds).length != 0) {
      serviceAccountIds.accounts.forEach((account) => {
        SpreadsheetApp.getActive().appendRow([account.projectId, account.oauth2ClientId]);
      })
    }
    else {
      // DO NOTHING
    }
  })
}