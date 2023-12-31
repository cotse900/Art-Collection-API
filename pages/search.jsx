import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearch(){
    const router = useRouter();
    const { register, handleSubmit, formState: {errors}, setValue } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const submitForm = (data) => {
        let queryString = `searchBy=${data.searchBy}`;
        if (data.geoLocation) {
          queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        }
        if (data.medium) {
          queryString += `&medium=${encodeURIComponent(data.medium)}`;
        }
        queryString += `&isOnView=${data.isOnView || false}`;
        queryString += `&isHighlight=${data.isHighlight || false}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;
    
        router.push(`/artwork?${queryString}`);
        //reset(); //from A4
        //A5 step 6
        setSearchHistory((current) => [...current, queryString]);
      };

    return (
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label className='form-label'>Search Query</Form.Label>
                        <Form.Control type="text" placeholder="" name="q" {...register("q", { required: true })}
                        className={errors.q ? "is-invalid" : ""}
                        />

                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                    <Form.Label className='form-label'>Search By</Form.Label>
                    <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}
                    onChange={(e) => {setValue("searchBy", e.target.value)}}
                    >
                        <option value="title">Title</option>
                        <option value="tags">Tags</option>
                        <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                    </Col>
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label className='form-label'>Geo Location</Form.Label>
                        <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")}/>
                        <Form.Text className="form-label-muted">
                        Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                    <Form.Group className="mb-3">
                        <Form.Label className='form-label'>Medium</Form.Label>
                        <Form.Control type="text" placeholder="" name="medium" {...register("medium")}/>
                        <Form.Text className="form-label-muted">
                        Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Check
                        type="checkbox"
                        label="Highlighted"
                        name="isHighlight" {...register("isHighlight")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Currently on View"
                        name="isOnView" {...register("isOnView")}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <br />
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                    </Col>
                </Row>
            </Form>
    )
}