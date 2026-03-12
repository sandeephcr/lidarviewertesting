class SettingsLocators {

    // Settings dialog
    get settingsModal() {
      return cy.contains('.heading2', 'Settings');
    }
  
    get closeSettingsBtn() {
      return cy.get('[data-testid="closeButton"]');
    }
  
    // Left navigation tabs
    get canvasTab() {
      return cy.contains('.SettingOptions', 'Canvas');
    }
  
    get measurementsTab() {
      return cy.contains('.SettingOptions', 'Measurements');
    }
  
    get generalTab() {
      return cy.contains('.SettingOptions', 'General');
    }
  
    // Point Cloud Type
    get pointCloudTypeOptions() {
      return cy.contains('.CanvasContent', 'Point Cloud Type')
        .parent()
        .find('[data-testid="radioButtonDiv"]');
    }
  
    // Point Cloud Density
    get pointCloudDensityOptions() {
      return cy.contains('.CanvasContent', 'Point Cloud Density')
        .parent()
        .find('[data-testid="radioButtonDiv"]');
    }
  
    // Render Distance
    get renderDistanceOptions() {
      return cy.contains('.CanvasContent', 'Render Distance')
        .parent()
        .find('[data-testid="radioButtonDiv"]');
    }
  
    // Visible Point Limit
    get visiblePointLimitOptions() {
      return cy.contains('.CanvasContent', 'Visible Point Limit')
        .parent()
        .find('[data-testid="radioButtonDiv"]');
    }
  
    // Range sliders
    get rangeSliders() {
      return cy.get('[data-testid="range-slider"]');
    }
  
    get nearDistanceSlider() {
      return cy.get('[aria-labelledby="nearDistanceLabel"]');
    }
  
    get farDistanceSlider() {
      return cy.get('[aria-labelledby="farDistanceLabel"]');
    }
  
    // Timestamp radio buttons
    get timestampOptions() {
      return cy.contains('.CanvasContent', 'Timestamp')
        .parent()
        .find('[data-testid="radioButtonDiv"]');
    }
  
    // Color pickers
    get cursorHighlightColorInput() {
      return cy.get('[data-testid="color-input"]').first();
    }
  
    get viewerBackgroundColorInput() {
      return cy.get('[data-testid="color-input"]').last();
    }
  
    // Timestamp range toggle
    get timestampRangeCheckbox() {
      return cy.get('[data-testid="checkbox-Timestamp Range"]');
    }
  
    // Pan Indicator
    get togglePanIndicator() {
      return cy.get('#togglePanIndicator');
    }
  
    // 3D Axis helper
    get toggle3DAxisHelper() {
      return cy.get('[data-testid="toggle-3d-view"]');
    }
  
    // Compact view
    get compactMapViewToggle() {
      return cy.get('#compactMapView');
    }

     // Vertical Measurement Offset section container
    get getVerticalOffsetSection() {
        return cy.contains('div', 'Vertical Measurement Offset')
        .parents('.CanvasContent');
    }

    // Vertical Measurement Offset slider
    get getVerticalOffsetSlider() {
        return this.getVerticalOffsetSection
        .find('input[type="range"]');
    }

    // Current vertical offset value indicator (number above slider)
    get getVerticalOffsetValue() {
        return this.getVerticalOffsetSection
        .find('.RangeIndicatorValue');
    }
  
  }
  
  export default new SettingsLocators();