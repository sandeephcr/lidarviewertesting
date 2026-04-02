import LidarViewer from "../../locators/LidarViewer";

export const selectRunInPermissions = (runName, permissionType) => {

    const searchAndSelect = () => {
  
      cy.get('.rowContainer').then(($rows) => {
  
        let found = false;
  
        $rows.each((index, row) => {
            const name = row.querySelector('.userEllipses')?.innerText.trim();

            if (name === runName) {
              found = true;
                LidarViewer.selectDropdownOption(runName, permissionType);
            }
            
        });
  
        if (!found) {
          cy.get('body').then(($body) => {
  
            const nextArrow = $body.find('.arrow.right').parent();
  
            // check if disabled
            if (nextArrow.hasClass('disabled')) {
              throw new Error(`Run "${runName}" not found in any page`);
            } else {
              cy.wrap(nextArrow).click();
              cy.wait(300);
              searchAndSelect(); // recursion
            }
  
          });
        }
  
      });
    };
  
    searchAndSelect();
};

export const removeReadPermission = (runName) => {

    const searchAndRemove = () => {
  
      cy.get('.rowContainer').then(($rows) => {
  
        let found = false;
  
        $rows.each((index, row) => {
  
          const name = row.querySelector('.userEllipses')?.innerText.trim();
  
          if (name === runName) {
            found = true;
            LidarViewer.readCheckbox(runName).find('img').click({ force: true });
          }
  
        });
  
        if (!found) {
          cy.get('body').then(($body) => {
  
            const nextArrow = $body.find('.arrow.right').parent();
  
            if (nextArrow.hasClass('disabled')) {
              throw new Error(`Run "${runName}" not found while removing permission`);
            } else {
              cy.wrap(nextArrow).click();
              cy.wait(300);
              searchAndRemove(); // recursive call
            }
  
          });
        }
  
      });
    };
  
    searchAndRemove();
};

export const removeWritePermission = (runName) => {

    const searchAndRemove = () => {
  
      cy.get('.rowContainer').then(($rows) => {
  
        let found = false;
  
        $rows.each((index, row) => {
  
          const name = row.querySelector('.userEllipses')?.innerText.trim();
  
          if (name === runName) {
            found = true;
            LidarViewer.writeCheckbox(runName).find('img').click({ force: true });
          }
  
        });
  
        if (!found) {
          cy.get('body').then(($body) => {
  
            const nextArrow = $body.find('.arrow.right').parent();
  
            if (nextArrow.hasClass('disabled')) {
              throw new Error(`Run "${runName}" not found while removing permission`);
            } else {
              cy.wrap(nextArrow).click();
              cy.wait(300);
              searchAndRemove(); // recursive call
            }
  
          });
        }
  
      });
    };
  
    searchAndRemove();
};