import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-app-bread-crumb',
  templateUrl: './app-bread-crumb.component.html',
  styleUrls: ['./app-bread-crumb.component.scss']
})
export class AppBreadCrumbComponent implements OnInit {
  @Input()
  public deliminator: string = ">";

  breadcrumbs: Array<{ label: string; url: string }> = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.breadcrumbs = [];
        let currentRoute = this.activatedRoute.root,
          url = "";
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if (route.outlet === "primary") {
              const routeSnapshot = route.snapshot;

              url +=
                "/" + routeSnapshot.url.map(segment => segment.path).join("/");
              this.breadcrumbs.push({
                label: route.snapshot.data['breadCrum'],
                url: url
              });

              currentRoute = route;
            }
          });
        } while (currentRoute);
      });
  }


}