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
    // Measurements details toggle
    get getMeasurementDetailsBtn() {
      return cy.get('.NavBarToggleIconButton').contains('Details');
    }

    // Clear measurements button
    get getClearMeasurementsBtn() {
      return cy.get('.NavBarToggleIconButton').contains('Clear');
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
        return cy.contains('.ToolTip-container', /^Point Measurement$/);
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
        return cy.contains('.ToolTip-container', /^Add Point$/);
    }
// Comapct Map View menu
    get getMapLayerFilterBtn() {
      return cy.contains('.ToolTip-container', 'Map layer filter');
    }
    
    get getZoomToCurrentMarkerBtn() {
      return cy.contains('.ToolTip-container', 'Zoom to current marker');
    }
    
    get getZoomToRunMarkersBtn() {
      return cy.contains('.ToolTip-container', 'Zoom to run markers');
    }
    
    get getEventImportBtn() {
      return cy.contains('.ToolTip-container', 'Event Import');
    }
  // Filter Menu

  get getRunMarkersToggle() {
    return cy.get('#runMarkers');
  }
  
  get getPolesToggle() {
    return cy.get('#poles');
  }
  
  get getSpansToggle() {
    return cy.get('#spans');
  }
  
  get getMeasurementsToggle() {
    return cy.get('#measurements');
  }
  
  get getPointFeaturesToggle() {
    return cy.get('#pointFeatures');
  }
  
  get getKMLToggle() {
    return cy.get('#kml');
  }
  
  get getEventsToggle() {
    return cy.get('#events');
  }

  // run markers
  get getRunMarkerButtons() {
    return cy.get('div[role="button"][tabindex="-1"]');
  }

  // Multi run import
  get getRunSelectContainer() {
    return cy.contains('span', 'Run Select').parent();
  }
  
  get getRunSelectDropdown() {
    return cy.contains('span', 'Run Select')
      .parent()
      .find('.dropdown-container');
  }
  
  get getRunSelectArrow() {
    return cy.contains('span', 'Run Select')
      .parent()
      .find('.dropdown-heading-dropdown-arrow');
  }
  
  get getRunSelectPlaceholder() {
    return cy.contains('span', 'Run Select')
      .parent()
      .find('.dropdown-heading-value');
  }
  getRunOption(runName) {
    return cy.contains('.dropdown-item', runName);
  }
  get getSelectAllRunsOption() {
    return cy.contains('label', 'Select All');
  }

  // ===============================
  // Concurrent Users Module
  // ===============================

  // Page container
  get getConcurrentUsersContainer() {
    return cy.get('.concurrent_user_container');
  }

  // ===============================
  // Active User Count Section
  // ===============================

  get getActiveUsersCard() {
    return cy.contains('.cards', 'Active User Count');
  }

  get getActiveUsersExportButton() {
    return cy.contains('.cards', 'Active User Count')
      .find('button.primary-btn');
  }

  get getTotalActiveUsersText() {
    return cy.contains('.cards', 'Active User Count')
      .find('.ActiveUsersCountContainer__header');
  }

  get getServerUserCards() {
    return cy.contains('.cards', 'Active User Count')
      .find('[data-testid="user-card"]');
  }

  // ===============================
  // Live User Trend Section
  // ===============================

  get getLiveUserTrendCard() {
    return cy.contains('.cards', 'Live User Trend');
  }

  get getLiveUserTrendDropdown() {
    return cy.contains('.cards', 'Live User Trend')
      .find('select.concurrentdropdown');
  }

  get getLiveUserTrendChart() {
    return cy.contains('.cards', 'Live User Trend')
      .find('canvas');
  }

  // ===============================
  // User Metrics Trend Section
  // ===============================

  get getUserMetricsTrendCard() {
    return cy.contains('.cards', 'User Metrics Trend');
  }

  get getUserMetricsRangeDropdown() {
    return cy.contains('.cards', 'User Metrics Trend')
      .find('.umt-range');
  }

  get getUserMetricsMetricDropdown() {
    return cy.contains('.cards', 'User Metrics Trend')
      .find('.umt-metric');
  }

  get getUserMetricsSiteDropdown() {
    return cy.contains('.cards', 'User Metrics Trend')
      .find('.umt-site-dropdown select');
  }

  get getUserMetricsChart() {
    return cy.contains('.cards', 'User Metrics Trend')
      .find('canvas');
  }

  // ===============================
  // Concurrent Users Export Modal
  // ===============================

  get getConcurrentUsersExportModal() {
    return cy.contains('span', 'Export Concurrent Users Data')
      .parents('.ModalSmall');
  }

  get getConcurrentUsersExportModalCloseButton() {
    return cy.contains('span', 'Export Concurrent Users Data')
      .parents('.ModalSmall')
      .find('[data-testid="closeButton"]');
  }

  // Preset buttons
  get getExportPresetTodayButton() {
    return cy.contains('.cu-btn', 'Today');
  }

  get getExportPresetLast7DaysButton() {
    return cy.contains('.cu-btn', 'Last 7 Days');
  }

  get getExportPresetLast30DaysButton() {
    return cy.contains('.cu-btn', 'Last 30 Days');
  }

  get getExportPresetLast90DaysButton() {
    return cy.contains('.cu-btn', 'Last 90 Days');
  }

  // Date inputs
  get getExportFromDateInput() {
    return cy.contains('label', 'From Date')
      .parent()
      .find('input[type="date"]');
  }

  get getExportToDateInput() {
    return cy.contains('label', 'To Date')
      .parent()
      .find('input[type="date"]');
  }

  // Action buttons
  get getExportClearButton() {
    return cy.contains('.cu-btn', 'Clear');
  }

  get getExportCancelButton() {
    return cy.get('[data-testid="cancel-button"]');
  }

  get getExportConfirmButton() {
    return cy.get('[data-testid="confirm-button"]');
  }
// Multi Sensor
  get getPcdFilterButton() {
    return cy.contains('.ToolTip-container', 'PCD filters');
  }
  // Filter popup
  get getLidarFilterTable() {
    return cy.get('#tw-panel-class-filters2 table');
  }

  // Unit checkboxes
  get getUnit1Checkbox() {
    return cy.get('#tw-panel-class-filters2 tbody tr').eq(0).find('input[type="checkbox"]');
  }

  get getUnit2Checkbox() {
    return cy.get('#tw-panel-class-filters2 tbody tr').eq(1).find('input[type="checkbox"]');
  }

}
  
export default new ViewerElements();