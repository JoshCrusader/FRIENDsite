import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';

class BlogCard extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>{{titleName}}</h1>
        <p>{{authorName}}</p>
        <p>Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Lorem ipsum dolor sit amet, per in nusquam nominavi periculis, sit elit oportere ea.Cu mei vide viris gloriatur, at populo eripuit sit.</p>
      </div>
    `;
  }
  static get properties() {
    return {
      titleName: {
        type: String,
        value: 'Test',
        notify: true,
      },
      authorName: {
        type: String,
        value: 'Test',
        notify: true,
      },
    };
  }
}

window.customElements.define('blog-card', BlogCard);
