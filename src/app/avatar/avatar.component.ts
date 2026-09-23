import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  template: `
    <div class="avatar">
      {{ name() }}
    </div>
  `,
  styles: ``
})
export class AvatarComponent {
  readonly name = input.required<string>();
}
