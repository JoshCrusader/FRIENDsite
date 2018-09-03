/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../shared-styles.js';
import '../Components/BlogCard.js'
import '@polymer/iron-ajax/iron-ajax.js';
class ViewBlog extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax
          auto
          url="http://127.0.0.1:3000/api/getBlogs"
          handle-as="json"
          last-response="{{data}}">
      </iron-ajax>
      <template is="dom-repeat" items="{{_toArray(data)}}">
        <blog-card title-name="{{item.Title}}" author-name="{{item.Description}}"></blog-card>
      </template>
    `;
  }
  _toArray(jsonobj){
    /*
      
      below returns an array of objects with the desired properties for our blog cards 
    */
    return Object.keys(jsonobj).map(function(key){
      return {
        Title: jsonobj[key].Title,
        Description: jsonobj[key].Description 
      }
    })
  }
}

window.customElements.define('view-blog', ViewBlog);
