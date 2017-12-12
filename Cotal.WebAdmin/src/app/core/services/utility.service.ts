import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from './authen.service';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class UtilityService {
  private _router: Router;

  constructor(router: Router, private http: Http, private authenService: AuthenService) {
    this._router = router;
  }

  convertDateTime(date: Date) {
    var _formattedDate = new Date(date.toString());
    return _formattedDate.toDateString();
  }

  navigate(path: string) {
    this._router.navigate([path]);
  }
  navigateToLogin() {
    this._router.navigate([UrlConstants.LOGIN]);
  }
  Unflatten = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    if (arr.length == 0) return roots;
    var group = this.groupBy(arr, 'parent')
    let note = group["null"]; 
    
    note.forEach(it => {   
     it.children=[];
     let listchildren = group["[object Object]"];
     it.children =listchildren.filter(c=>c.parent.id==it.id);
     roots.push(it);
    });
    return roots;
  }
  public groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  Unflatten2 = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (var i = 0; i < arr.length; i += 1) {
      let node = arr[i];
      node.children = [];
      map[node.id] = i; // use map to look-up the parents
      if (node.parent !== null && node.parent != undefined) {
        arr[map[node.parent]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  MakeSeoTitle(input: string) {
    if (input == undefined || input == '')
      return '';
    //Đổi chữ hoa thành chữ thường
    var slug = input.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
  }
}