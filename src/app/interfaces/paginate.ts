export interface Paginate<T> {
    items:      T[];
    page:       number;
    pageSize:   number;
    totalCount: number;
    totalPages: number;
}