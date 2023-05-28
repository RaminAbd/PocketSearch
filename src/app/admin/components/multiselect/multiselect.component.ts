import { Component } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent {
  options: string[] = ['Option 1', 'Option 2', 'Option 3']; // Replace with your own options
  selectedOptions: string[] = [];
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onOptionChange(target: any, option: string): void {
    if (target.checked) {
      // Add the selected option
      this.selectedOptions.push(option);
    } else {
      // Remove the deselected option
      const index = this.selectedOptions.indexOf(option);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }

    // Handle any additional logic when the selected options change
    console.log(this.selectedOptions);
  }
}
