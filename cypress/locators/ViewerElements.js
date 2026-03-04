class ViewerElements {

    // ===== VIEW TOGGLES =====
    get getCameraViewBtn() {
      return cy.contains('.ToolTip-container', 'Camera View');
    }
  
    get getPcdViewBtn() {
      return cy.contains('.ToolTip-container', 'PCD View');
    }
  
    get getPcdCameraViewBtn() {
      return cy.contains('.ToolTip-container', 'PCD + Camera');
    }
  
    get getToggle3DViewBtn() {
      return cy.contains('.ToolTip-container', 'Toggle 3D View');
    }
  
    get getToggleTimestampBtn() {
      return cy.contains('.ToolTip-container', 'Toggle Timestamp');
    }
  
    // ===== MEASUREMENT / DRAW TOOLS =====
    get getMeasurementsBtn() {
      return cy.contains('.ToolTip-container', 'Measurements');
    }
  
    get getCalloutsBtn() {
      return cy.contains('.ToolTip-container', 'Callouts');
    }
  
    get getPoleDetailsBtn() {
      return cy.contains('.ToolTip-container', 'Pole details');
    }
  
    // ===== UTILITIES =====
    get getHighlightBtn() {
      return cy.contains('.ToolTip-container', 'Highlight');
    }
  
    get getSnapshotBtn() {
      return cy.contains('.ToolTip-container', 'Snapshot');
    }
  
    get getPcdFiltersBtn() {
      return cy.contains('.ToolTip-container', 'PCD filters');
    }

    // ===== CONFIG / EXTRA TOOLS =====

    get getLeverArmBtn() {
        return cy.contains('.ToolTip-container', 'Lever Arm');
    }
  
    get getSettingsBtn() {
        return cy.contains('.ToolTip-container', 'Settings');
    }
    
    get getMoreOptionsBtn() {
        return cy.contains('.ToolTip-container', 'More options');
    }

        // ===== More Options Dropdown =====
    get getMoreOptionsDropdown() {
        return cy.get('.shawdow-light.round-corner-6.padding-10');
    }
    
    // Individual Options
    get getSaveOption() {
        return cy.contains('.MoreOption', 'Save');
    }
    
    get getImportOption() {
        return cy.contains('.MoreOption', 'Import');
    }
    
    get getExportOption() {
        return cy.contains('.MoreOption', 'Export');
    }
    
    get getKmlOption() {
        return cy.contains('.MoreOption', 'Kml');
    }

    // ===== Save Dialog =====
    get getSaveDialog() {
        return cy.get('.ModalMedium');
      }
      
      get getSaveDialogHeader() {
        return cy.contains('.heading2', 'Save Dialog');
      }
      get getSaveToLocalCheckbox() {
        return cy.contains('[role="checkbox"]', 'Local');
      }
      
      get getSaveToServerCheckbox() {
        return cy.contains('[role="checkbox"]', 'Server');
      }
      get getMeasurementsCheckbox() {
        return cy.contains('[role="checkbox"]', 'Measurements');
      }
      
      get getCalloutsCheckbox() {
        return cy.contains('[role="checkbox"]', 'Callouts');
      }
      
      get getPolesCheckbox() {
        return cy.contains('[role="checkbox"]', 'Poles');
      }
      
      get getPointFeaturesCheckbox() {
        return cy.contains('[role="checkbox"]', 'Point Features');
      }
      
      get getPolylinesCheckbox() {
        return cy.contains('[role="checkbox"]', 'Polylines');
      }
      get getSaveConfirmBtn() {
        return cy.get('[data-testid="confirm-button"]');
      }
      
      get getSaveCancelBtn() {
        return cy.get('[data-testid="cancel-button"]');
      }
      
      get getSaveCloseBtn() {
        return cy.get('[data-testid="closeButton"]');
      }

    // ================= IMPORT MODAL =================

// Modal Container
get getImportDialog() {
    return cy.contains('.ModalMedium', 'Import');
  }
  
  get getImportHeader() {
    return cy.contains('.heading2', 'Import');
  }
  
  // Source Dropdown
  get getImportSourceDropdown() {
    return cy.get('.ModalMedium select');
  }
  
  selectImportSource(optionText) {
    return cy.get('.ModalMedium select').select(optionText);
  }
  
  // Import Checkboxes
  get getImportCalloutsCheckbox() {
    return cy.contains('.import-options [role="checkbox"]', 'Callouts');
  }
  
  get getImportMeasurementsCheckbox() {
    return cy.contains('.import-options [role="checkbox"]', 'Measurements');
  }
  
  get getImportPolesCheckbox() {
    return cy.contains('.import-options [role="checkbox"]', 'Poles');
  }
  
  get getImportPointFeaturesCheckbox() {
    return cy.contains('.import-options [role="checkbox"]', 'Point features');
  }
  
  get getImportPolylinesCheckbox() {
    return cy.contains('.import-options [role="checkbox"]', 'Polylines');
  }
  
  // Footer Buttons
  get getImportApplyBtn() {
    return cy.get('.ModalMedium [data-testid="confirm-button"]');
  }
  
  get getImportCancelBtn() {
    return cy.get('.ModalMedium [data-testid="cancel-button"]');
  }
  
  get getImportCloseBtn() {
    return cy.get('.ModalMedium [data-testid="closeButton"]');
  }

  // ================= EXPORT MODAL =================

// Modal Container
get getExportDialog() {
    return cy.contains('.ModalMedium', 'Export');
  }
  
  get getExportHeader() {
    return cy.contains('.heading2', 'Export');
  }
  
  // Dropdowns
  get getExportFeatureDropdown() {
    return cy.contains('.ModalMedium span', 'Feature Dropdown')
             .parent()
             .find('select');
  }
  
  get getExportUnitsDropdown() {
    return cy.contains('.ModalMedium span', 'Units')
             .parent()
             .find('select');
  }
  
  get getExportTypeDropdown() {
    return cy.contains('.ModalMedium span', 'Export Type')
             .parent()
             .find('select');
  }
  
  // Selection Helpers
  selectExportFeature(option) {
    return this.getExportFeatureDropdown.select(option);
  }
  
  selectExportUnits(option) {
    return this.getExportUnitsDropdown.select(option);
  }
  
  selectExportType(option) {
    return this.getExportTypeDropdown.select(option);
  }
  
  // Buttons
  get getExportConfirmBtn() {
    return cy.contains('.ViewerButton', 'Export');
  }
  
  get getExportCancelBtn() {
    return cy.contains('.ViewerButton', 'Cancel');
  }
  
  get getExportCloseBtn() {
    return cy.get('.ModalMedium [data-testid="closeButton"]');
  }

    // Container
    get getSideToolbar() {
        return cy.get('.SideToolsBarContainer');
    }
    
  // ===== Measurement Tools =====
  
    get getPointToPointMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Point to Point Measurement');
    }
    
    get getVerticalMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Vertical Measurement');
    }
    
    get getVerticalOffsetMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Vertical Offset Measurement');
    }
    
    get getHorizontalMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Horizontal Measurement');
    }
    
    get getAngleMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Angle Measurement');
    }
    
    get getPerpendicularMeasurement() {
        return cy.contains('.ToolTip-container', 'Add Pependicular Measurement');
    }
    
    get getPointMeasurement() {
        return cy.contains('.ToolTip-container', 'Point Measurement');
    }
    
    get getPolylineMeasurement() {
        return cy.contains('.ToolTip-container', 'Polyline');
    }
    
    // ===== Clip / Info =====
    
    get getToggleCylindricalClip() {
        return cy.contains('.ToolTip-container', 'Toggle Cylindrical Clip');
    }
    
    get getGpsInfoBtn() {
        return cy.contains('.ToolTip-container', 'GPS info');
    }
    
    // ===== Pole / Annotation =====
    
    get getAddPoleBtn() {
        return cy.contains('.ToolTip-container', 'Add pole');
    }
    
    get getAddPointBtn() {
        return cy.contains('.ToolTip-container', 'Add Point');
    }
  
}
  
export default new ViewerElements();