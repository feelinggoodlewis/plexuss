@php $inMili = '';$military = ''; @endphp
@if(isset($filters))
	@foreach($filters as $filter)
		@if (isset($filter["inMilitary"]))
			@if (isset($filter['inMilitary'][0]) && $filter['inMilitary'][0] == 1)
				@php $inMili = 1; @endphp
			@else
				@php $inMili = 0; @endphp
			@endif
		@endif
		@if (isset($filter['militaryAffiliation']))
			@php $military = $filter['militaryAffiliation']; @endphp
		@endif
	@endforeach
@endif

<div class="filter-crumbs-container">
  <ul class="inline-list filter-crumb-list">
    <li>
      <div class="clearfix">
        <div class="left section">{{$section}}: </div>
        	
	 	</div>
    </li>
  </ul>
</div>
<div class="row filter-by-militaryAffilation-container filter-page-section" data-section="militaryAffiliation">
	<div class="column small-12">
		Military Affiliation	
	</div>


	<div class="column small-12">
	
		
		<br />
		<div class="row component" data-component="inMilitary">
			<div class="column small-12 medium-9">
				{{Form::label('inMilitary_filter', 'In Military?', array('class' => 'make_bold'))}}
				{{Form::select('inMilitary', array(''=>'Select...','0'=>'No', '1'=>'Yes'), $inMili, array('id' => 'inMilitary_filter', 'class' => 'select-filter filter-this inMili mili'))}}
			</div>
		</div>

		<div class="row component miliAffili @if(isset($inMili) && $inMili != '1') hide @endif" data-component="militaryAffiliation">
			<div class="column small-12 medium-9">
				
				{{Form::label('militaryAffiliation_filter', 'Military Affiliation:', array('class' => 'make_bold'))}}
				{{Form::select('militaryAffiliation', $militaryAffiliation, isset($military[0]) ? $military : '', array('id' => 'militaryAffiliation_filter', 'class' => 'select-filter filter-this mili'))}}
				 @if(isset($military) && count($military) > 0 )
					@foreach( $military as $key => $v )
						<div class="military-values hide" data-val="{{$v}}"></div>
					@endforeach
				@endif	
				
			</div>
		</div>
	

	</div>
</div>