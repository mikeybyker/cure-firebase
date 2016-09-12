(function() {
    'use strict';

    describe('controller TrackController', function(){
        var vm,
            $rootScope,
            location,
            d = [
                    {
                        "artist":"The Cure",
                        "title":"Faith"
                    },
                    {
                        "4870":
                            {
                            "albumTitle":"Faith",
                            "artist":"The Cure",
                            "index":1,
                            "title":"The Holy Hour",
                            "total":5,
                            "votes":1
                        },
                        "4871":
                            {
                            "albumTitle":"Faith",
                            "artist":"The Cure",
                            "index":2,
                            "title":"Primary",
                            "total":1,
                            "votes":1
                        }
                    }
                ];

        beforeEach(module('cure'));

        describe('Handle missing routeParams', function(){
            beforeEach(inject(function(_$controller_, _$rootScope_, _$location_) {        
                $rootScope = _$rootScope_;
                location = _$location_;
                var scope = $rootScope.$new();                    
                spyOn(location, 'path');
                vm = _$controller_('TrackController',{$routeParams: {}, $scope:scope, user:{uid:888}});
            }));
            it('track should be undefined', function() {
                $rootScope.$digest();
                expect(vm.track).toBe(undefined);
            });
            it('votes should be undefined', function() {
                $rootScope.$digest();
                expect(vm.votes).toBe(undefined);
            });
            it('cover should be undefined', function() {
                $rootScope.$digest();
                expect(vm.cover).toBe(undefined);
            });
            it('location set to /', function() {                 
                $rootScope.$digest();                   
                expect(location.path).toHaveBeenCalledWith('/');
            });
        });

        describe('Load up data using routeParams', function(){
            beforeEach(inject(function(_$controller_, _$rootScope_, _$q_) {        
                $rootScope = _$rootScope_;
                var scope = $rootScope.$new();

                // Mock Discog service
                var deferredDiscog = _$q_.defer(),
                    deferredVote = _$q_.defer(),
                    Discog = {
                        getCover : function(id){
                            if(id === 4868){
                                deferredDiscog.resolve('TheCureFaith.jpg');
                            } else {
                                deferredDiscog.reject('');
                            }
                            return deferredDiscog.promise;
                        }
                    },
                    ratings = {
                        $id: "4870",
                        $priority: null,
                        $value: 5
                    },
                    track = {
                        $id: "4870",
                        $priority: null,
                        albumArtist:"The Cure",
                        albumId: 4868,
                        albumTitle:"Faith",
                        artist:"The Cure"
                    },
                    Vote = {
                        initTrack : function(releaseId, trackId, userId){
                            if(releaseId === 4868){
                                deferredVote.resolve({track:track, ratings:ratings});
                            } else {
                                deferredVote.reject('');
                            }
                            return deferredVote.promise;
                        },
                        destroy: angular.noop
                    };
                // discog/4868/4870 : Faith - The Holy Hour
                vm = _$controller_('TrackController',{Discog: Discog, Vote: Vote, $routeParams: {id: 4868, track: 4870}, $scope:scope, user:{uid:888}});
            }));

            it('albumArtist should be "The Cure"', function() {
                $rootScope.$digest();
                expect(vm.track.albumArtist).toBe('The Cure');
            });
            it('votes should be 5', function() {
                $rootScope.$digest();
                expect(vm.votes.$value).toBe(5);
            });
            it('Image name to be loaded', function() {
                $rootScope.$digest();
                expect(vm.cover).toBe('TheCureFaith.jpg');
            });
        });

    });
}());
