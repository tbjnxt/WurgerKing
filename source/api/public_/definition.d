module api.public_.definition;

import api.v4.coupons;

interface PublicAPI
{
	Coupon[][] getCoupons(int[] filterCategories = null, bool onlyActive = true, int limit = 100, bool allGeo = false) @safe;
}
