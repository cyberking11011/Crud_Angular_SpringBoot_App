import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from 'src/app/services/node.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  selectedLang: string = '';
  searchValue: string = '';

  files: TreeNode[] = [];

  sidebarVisible!: boolean;
  filteredNodes: TreeNode[] = [];

  constructor(
    private nodeService: NodeService,
    private translateService: TranslateService
  ) {
    this.selectedLang = localStorage.getItem('language') || '';
    this.translateService.use(this.selectedLang);
  }

  ngOnInit() {
    this.nodeService.getFiles().then((data) => {
      this.files = data;
      this.filteredNodes = data;
    });
  }

  translateTree(tree: TreeNode[]): TreeNode[] {
    for (let parent of tree) {
      if (parent.label) {
        this.translateService
          .get(parent.label)
          .subscribe((translatedParent) => {
            parent.label = translatedParent;
          });
      }
      if (parent.children) {
        for (let child of parent.children) {
          if (child.label) {
            this.translateService
              .get(child.label)
              .subscribe((translatedChild) => {
                child.label = translatedChild;
              });
          }
          if (child.children) {
            for (let grandchild of child.children) {
              if(grandchild.label){
                this.translateService
                .get(grandchild.label)
                .subscribe((translatedGrandChild)=>{
                  grandchild.label=translatedGrandChild;
                })
              }
            }
          }
        }
      }
    }

    return tree;
  }
  searchByName(search: any): TreeNode[] {
    let parents: any[] = [];

    this.searchValue = search.target.value;
    let tree = this.translateTree(this.files);
    this.filteredNodes = [];
    for (let parent of tree) {
      if (parent.children) {
        for (let child of parent.children) {
         
         
          if (
            child.label?.toLowerCase().includes(this.searchValue.toLowerCase())
          ) {
            parents.push(parent);
            this.filteredNodes = parents;
            break;
          }
        }

        continue;
      }
    }

    

    return this.filteredNodes;
  }
}
