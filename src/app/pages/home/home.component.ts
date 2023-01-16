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

  ngOnInit(): void {
    const utcDt = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    this.fileName = 'cms-' + utcDt + '.json';
    console.log('File Name : ', this.fileName);
  }
}
