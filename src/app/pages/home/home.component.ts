import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: number = 0;
  users: number = 0;
  mean_posts_per_user: number = 0;
  arrUser: any = [];
  count: number = 0;
  arrPosts: any = [];
  postCount: number = 0;
  mean: number = 0;
  sumObj: any = [];
  validatePostNumber: boolean = false;
  validateUserNumber: boolean = false;
  validateMean: boolean = false;
  validateFileName: boolean = false;
  fileName: string = '';
  constructor(private backendService: BackendService) {}

  GetData(): void {
    this.backendService.GetRequest().subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('Unable to Connect to CMS');
      } else {
        console.log('Getting CMS data : ', resp);
        console.log(
          'CMS data has: ' +
            resp.length +
            ' records where ' +
            resp.length +
            ' is the number of posts'
        );
        let arr = JSON.stringify(resp);
        const isValidJSONData = this.evaluate_json_format(arr);
        isValidJSONData
          ? console.log('GENERATOR Recieved Valid JSON Data from the CMS ')
          : console.log(
              'GENERATOR Does Not Recieved Valid JSON Data from the CMS '
            );
        this.arrPosts = resp;
        for (let i = 0; i < resp.length; i++) {
          const k = this.arrUser.findIndex(
            (p: any) => p.userId == resp[i].userId
          );
          // Calculating Number of post created by each user
          if (k == -1) {
            let count = this.posts_by_UserId(resp[i].userId);
            const dx = {
              userId: resp[i].userId,
              postCreated: count,
            };
            this.arrUser.push(dx);
          }
        }
        console.log('Distinct User List: ', this.arrUser);
        console.log('Total Distinct User : ', this.arrUser.length);
        console.log('Total Posts : ', this.postCount);

        let mean = this.mean_number_of_posts_per_user(
          this.arrUser.length,
          this.postCount
        );

        this.sumObj = {
          posts: this.postCount,
          users: this.arrUser.length,
          mean_posts_per_user: mean,
        };

        console.log('Formatted JSON Object', this.sumObj);
      }
    });
  }

  evaluate_json_format(arr: any) {
    // To check a Valid json format we need to Take a Json object and wrap it with
    // JSON.stringify and then JSON.parse to see if there is any error or not
    try {
      JSON.parse(arr);
      return true;
    } catch (e) {
      return false;
    }
  }

  mean_number_of_posts_per_user(TotalUsers: number, TotalPosts: number) {
    // Mean number of Post = (Total Post created by All Users) / (Total Users)
    this.mean = Math.round(TotalPosts / TotalUsers);
    console.log('Mean number of posts per user', this.mean);
    return this.mean;
  }

  posts_by_UserId(userId: number) {
    let arr = this.arrPosts.filter((m: any) => m.userId == userId);
    // Calculating Total number of Posts being created by all users
    this.postCount = this.postCount + arr.length;
    return arr.length;
  }

  test2validate() {
    // Validate File Name
    // Check No of Posts and Users
    // Check the Mean of Posts by uses
    // If fail to save the file on disk, log the error message
    this.validateUserNumber = this.arrUser.length === 10 ? true : false;
    if (this.validateUserNumber) {
      console.log('Number of Users, ', this.arrUser.length + ' is validated');
    } else {
      console.log('Number of Users, ', this.arrUser.length + ' is incorrect');
    }

    this.validatePostNumber = this.postCount === 100 ? true : false;
    if (this.validatePostNumber) {
      console.log('Number of Posts, ', this.postCount + ' is validated');
    } else {
      console.log('Number of Posts, ', this.postCount + ' is incorrect');
    }

    this.validateMean = this.mean === 10 ? true : false;
    if (this.validateMean) {
      console.log('Mean is, ', this.mean + ' is validated');
    } else {
      console.log('Mean is, ', this.mean + ' is incorrect');
    }

    // let str = this.fileName.split('cms-'); 2023-01-15
    const utcDt = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    this.validateFileName = this.validateFileNameIsOK(utcDt);
    if (this.validateFileName) {
      console.log('File name, ', this.fileName + ' is matched');
    } else {
      console.log('File name, ', this.fileName + ' is not matched');
    }
  }

  validateFileNameIsOK(toDate: string) {
    // .match() method returns an array if matches found, otherwise return null
    // Array.isArray(some arr) check array
    let arrCMS = this.fileName.match('cms-');
    console.log(arrCMS);
    let isCMSExist = Array.isArray(arrCMS) ? true : false;

    let arrTodate = this.fileName.match(toDate);
    console.log(arrTodate);
    let isTodateExist = Array.isArray(arrTodate) ? true : false;

    let arrJSON = this.fileName.match('.json');
    console.log(arrJSON);
    let isJsonExist = Array.isArray(arrJSON) ? true : false;

    console.log(
      'cms- ' +
        isCMSExist +
        ' | Date ' +
        isTodateExist +
        ' | ext ' +
        isJsonExist
    );

    if (isCMSExist && isTodateExist && isJsonExist) {
      return true;
    } else {
      return false;
    }
  }

  save_file_to_disk() {
    const data = {
      posts: this.postCount,
      users: this.arrUser.length,
      mean_posts_per_user: this.mean,
      file_name: this.validateFileName
        ? this.fileName
        : console.log('Error at File Name'),
    };
    console.log(data);
    this.PostData(data);
  }

  PostData(data: any) {
    this.backendService.PostRequest(data).subscribe((resp: any) => {
      if (resp.ResponseCode == '401') {
        console.log('File Uploading was not successful.. check server side');
      } else {
        console.log('File is saved successfully..');
      }
    });
  }

  ngOnInit(): void {
    const utcDt = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    this.fileName = 'cms-' + utcDt + '.json';
    console.log('File Name : ', this.fileName);
  }
}
